const crypto = require('crypto');
const Joi = require('joi');
const Order = require('../models/Order');
const User = require('../models/User');
const Payment = require('../models/Payment');
const OtpToken = require('../models/OtpToken');
const {
  EMAIL_COOKIE_NAME,
  verifyEmailCookieValue,
} = require('../utils/emailVerification');

const createOrderSchema = Joi.object({
  customerName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(''),
  youtubeLink: Joi.string().uri().allow('', null),
  plan: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid('views', 'subscribers', 'watch_time', 'likes', 'package').required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    currency: Joi.string().default('INR'),
  }).required(),
});

const createCampaignOrderSchema = Joi.object({
  customerName: Joi.string().min(2).allow(''),
  email: Joi.string().email().required(),
  channel: Joi.object({
    name: Joi.string().required(),
    channelId: Joi.string().allow('', null),
    link: Joi.string().allow('', null),
    avatar: Joi.string().allow('', null),
  }).required(),
  videos: Joi.array()
    .items(
      Joi.object({
        videoId: Joi.string().required(),
        title: Joi.string().required(),
        link: Joi.string().allow('', null),
        thumbnail: Joi.string().allow('', null),
        viewsRequested: Joi.number().allow(null),
      })
    )
    .min(1)
    .max(5)
    .required(),
  package: Joi.object({
    id: Joi.string().allow('', null),
    name: Joi.string().required(),
    price: Joi.number().required(),
    currency: Joi.string().default('USD'),
    quantity: Joi.number().allow(null),
    type: Joi.string().allow('', null),
    description: Joi.string().allow('', null),
  }).required(),
  targeting: Joi.object({
    country: Joi.string().allow('', null),
    goal: Joi.string().allow('', null),
    duration: Joi.string().allow('', null),
    autoTargeting: Joi.boolean(),
    notes: Joi.string().allow('', null),
    gender: Joi.string().allow('', null).optional(),
    ages: Joi.array().items(Joi.string()).allow(null).optional(),
    interests: Joi.array().items(Joi.string()).allow(null).optional(),
  }).default({}),
  budget: Joi.number().required(),
  source: Joi.string()
    .valid('promote_video', 'promote_channel', 'packages', 'bulk_views', 'free_views')
    .default('promote_video'),
});

const ensureVerifiedEmail = async (req, email) => {
  const cookieValue = req.cookies?.[EMAIL_COOKIE_NAME];
  if (cookieValue && verifyEmailCookieValue(cookieValue, email)) {
    return null;
  }

  const verifiedOtp = await OtpToken.findOne({
    email: email.toLowerCase(),
    verified: true,
  });

  if (!verifiedOtp) {
    const err = new Error(
      'Email verification required. Please verify your email before submitting the order.'
    );
    err.status = 400;
    err.code = 'EMAIL_NOT_VERIFIED';
    throw err;
  }

  return verifiedOtp;
};

const findOrCreateUser = async (payload) => {
  let user = await User.findOne({ email: payload.email.toLowerCase() });
  if (!user) {
    user = await User.create({
      name: payload.customerName || payload.channel?.name || 'Campaign User',
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      emailVerified: true,
    });
  } else {
    user.name = payload.customerName || user.name;
    user.phone = payload.phone || user.phone;
    user.emailVerified = true;
    await user.save();
  }
  return user;
};

const createPaymentRecord = async ({ orderId, userId, amount, currency }) =>
  Payment.create({
    orderId,
    userId,
    amount,
    currency,
    gateway: process.env.DEFAULT_PAYMENT_GATEWAY || 'cashfree',
    status: 'pending',
  });

exports.createOrder = async (req, res, next) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const verifiedOtp = await ensureVerifiedEmail(req, value.email);

    // Generate secure, unique order ID: VID + timestamp + random bytes
    // Format: VID + timestamp (base36) + random (8 bytes hex) = ~20 chars
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomBytes = crypto.randomBytes(8).toString('hex').toUpperCase();
    const orderId = `VID${timestamp}${randomBytes}`;
    const user = await findOrCreateUser(value);
    const payment = await createPaymentRecord({
      orderId,
      userId: user._id,
      amount: value.plan.price,
      currency: value.plan.currency || 'INR',
    });

    const order = await Order.create({
      orderId,
      userId: user._id,
      paymentId: payment._id,
      youtubeLink: value.youtubeLink,
      plan: value.plan,
      status: 'payment_pending',
    });

    if (verifiedOtp) {
      await OtpToken.deleteOne({ _id: verifiedOtp._id });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway');

    return res.status(201).json(populatedOrder);
  } catch (err) {
    if (err.code === 'EMAIL_NOT_VERIFIED') {
      return res.status(400).json({ message: err.message, code: err.code });
    }
    return next(err);
  }
};

exports.createCampaignOrder = async (req, res, next) => {
  try {
    const { error, value } = createCampaignOrderSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: error.message });

    const verifiedOtp = await ensureVerifiedEmail(req, value.email);

    // Generate secure, unique order ID: VID + timestamp + random bytes
    // Format: VID + timestamp (base36) + random (8 bytes hex) = ~20 chars
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomBytes = crypto.randomBytes(8).toString('hex').toUpperCase();
    const orderId = `VID${timestamp}${randomBytes}`;
    const user = await findOrCreateUser(value);
    const payment = await createPaymentRecord({
      orderId,
      userId: user._id,
      amount: value.package.price,
      currency: value.package.currency || 'USD',
    });

    let totalViews =
      value.package.quantity ||
      value.videos.reduce((sum, video) => sum + (video.viewsRequested || 0), 0) ||
      value.budget;

    // Redeem available free views and add to total views
    let redeemedFreeViews = 0;
    try {
      const FreeViews = require('../models/FreeViews');
      const { redeemFreeViews } = require('./freeViews.controller');
      const freeViewsRecord = await FreeViews.findOne({ userId: user._id });
      
      if (freeViewsRecord && freeViewsRecord.balance > 0) {
        // Redeem all available free views
        const availableFreeViews = freeViewsRecord.balance;
        await redeemFreeViews(user._id, availableFreeViews);
        redeemedFreeViews = availableFreeViews;
        totalViews += redeemedFreeViews;
      }
    } catch (err) {
      // If free views redemption fails, log but don't block order creation
      console.error('Error redeeming free views:', err);
    }

    const plan = {
      name: value.package.name,
      type: value.package.type || 'package',
      quantity: totalViews,
      price: value.package.price,
      currency: value.package.currency || 'USD',
    };

    const order = await Order.create({
      orderId,
      userId: user._id,
      paymentId: payment._id,
      youtubeLink: value.videos[0]?.link,
      plan,
      status: 'payment_pending',
      campaignType: value.source,
      source: value.source,
      budget: value.budget,
      channel: value.channel,
      videos: value.videos,
      packageInfo: {
        id: value.package.id,
        name: value.package.name,
        price: value.package.price,
        currency: value.package.currency,
        description: value.package.description,
      },
      targeting: value.targeting,
      notes: value.targeting?.notes,
      freeViewsRedeemed: redeemedFreeViews, // Track redeemed free views
    });

    if (verifiedOtp) {
      await OtpToken.deleteOne({ _id: verifiedOtp._id });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway');

    // Award referrer if this is the user's first paid campaign
    // This runs asynchronously so it doesn't block the response
    const { awardReferrerOnFirstCampaign } = require('./freeViews.controller');
    awardReferrerOnFirstCampaign(user._id, order._id).catch(err => {
      console.error('Failed to award referrer:', err);
    });

    const checkoutBase =
      process.env.CHECKOUT_URL || process.env.FRONTEND_PAYMENT_URL || null;
    const paymentCheckoutUrl = checkoutBase
      ? `${checkoutBase}?orderId=${orderId}`
      : null;

    return res.status(201).json({
      order: populatedOrder,
      paymentCheckoutUrl,
    });
  } catch (err) {
    if (err.code === 'EMAIL_NOT_VERIFIED') {
      return res.status(400).json({ message: err.message, code: err.code });
    }
    return next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId })
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway paymentOrderId paymentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const User = require('../models/User');
    const normalizedEmail = email.toLowerCase().trim();
    console.log('Fetching orders for email:', normalizedEmail);
    
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log('User not found for email:', normalizedEmail);
      return res.json([]);
    }

    console.log('User found:', user._id, user.email);
    const orders = await Order.find({ userId: user._id })
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway paymentOrderId paymentId')
      .sort({ createdAt: -1 });

    console.log('Found orders:', orders.length);
    return res.json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    return next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const schema = Joi.object({ 
      status: Joi.string().valid('pending','payment_pending','paid','promotion_scheduled','in_progress','completed','failed').required(),
      adminComments: Joi.string().allow('')
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate(
      { orderId }, 
      { 
        status: value.status,
        adminComments: value.adminComments || undefined,
        completedAt: value.status === 'completed' ? new Date() : undefined
      }, 
      { new: true }
    )
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway paymentOrderId paymentId');
    
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    
    // Find the order first
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete associated payment if exists
    if (order.paymentId) {
      await Payment.findByIdAndDelete(order.paymentId);
    }

    // Delete the order
    await Order.findByIdAndDelete(order._id);

    return res.json({ 
      message: 'Order deleted successfully',
      orderId: orderId 
    });
  } catch (err) {
    return next(err);
  }
};


