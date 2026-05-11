const crypto = require('crypto');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const Payment = require('../models/Payment');
const OtpToken = require('../models/OtpToken');
const {
  EMAIL_COOKIE_NAME,
  verifyEmailCookieValue,
} = require('../utils/emailVerification');
const { sendStatusUpdateEmail } = require('../utils/emailService');

const createOrderSchema = Joi.object({
  customerName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(''),
  youtubeLink: Joi.string().uri().allow('', null),
  plan: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid('views', 'subscribers', 'watch_time', 'likes', 'package', 'bulk-views').required(),
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
    countries: Joi.array().items(Joi.string()).allow(null).optional(),
    goal: Joi.string().allow('', null),
    duration: Joi.string().allow('', null),
    customDurationDays: Joi.number().allow(null).optional(),
    autoTargeting: Joi.boolean(),
    notes: Joi.string().allow('', null),
    gender: Joi.string().allow('', null).optional(),
    ages: Joi.array().items(Joi.string()).allow(null).optional(),
    interests: Joi.array().items(Joi.string()).allow(null).optional(),
    keywords: Joi.array().items(Joi.string()).allow(null).optional(),
  }).default({}),
  budget: Joi.number().required(),
  source: Joi.string()
    .valid('promote_video', 'promote_channel', 'packages', 'bulk_views', 'free_views')
    .default('promote_video'),
});

const ensureVerifiedEmail = async (req, email) => {
  const normalizedEmail = email.toLowerCase().trim();
  console.log(`[DEBUG] Verifying email: ${normalizedEmail}`);

  const cookieValue = req.cookies?.[EMAIL_COOKIE_NAME];
  if (cookieValue && verifyEmailCookieValue(cookieValue, normalizedEmail)) {
    console.log(`[DEBUG] Verified via OTP cookie for: ${normalizedEmail}`);
    return null;
  }

  // Check if user is logged in (trusted session)
  const token = req.cookies?.vidfly_token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(`[DEBUG] Found auth token for: ${decoded.email}`);
      if (decoded.email && decoded.email.toLowerCase() === normalizedEmail) {
        console.log(`[DEBUG] Verified via Auth Token for: ${normalizedEmail}`);
        return null; // Email matched logged in user, consider verified
      }
    } catch (e) {
      console.warn(`[DEBUG] Invalid auth token: ${e.message}`);
    }
  }

  const verifiedOtp = await OtpToken.findOne({
    email: normalizedEmail,
    verified: true,
  });

  if (!verifiedOtp) {
    console.warn(`[DEBUG] Verification failed for: ${normalizedEmail}`);
    const err = new Error(
      'Email verification required. Please verify your email before submitting the order.'
    );
    err.status = 400;
    err.code = 'EMAIL_NOT_VERIFIED';
    throw err;
  }

  console.log(`[DEBUG] Verified via OtpToken record for: ${normalizedEmail}`);
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
        try {
          await redeemFreeViews(user._id, availableFreeViews);
          redeemedFreeViews = availableFreeViews;
          totalViews += redeemedFreeViews;
          console.log(`Successfully redeemed ${redeemedFreeViews} free views for user ${user._id}. New total views: ${totalViews}`);
        } catch (redeemErr) {
          // If redemption fails, log but continue without free views
          console.error('Failed to redeem free views:', redeemErr.message);
          // Don't add to totalViews if redemption failed
        }
      } else {
        console.log(`No free views to redeem for user ${user._id}. Balance: ${freeViewsRecord?.balance || 0}`);
      }
    } catch (err) {
      // If free views lookup fails, log but don't block order creation
      console.error('Error checking free views balance:', err.message);
    }

    const plan = {
      name: value.package.name,
      type: value.package.type || 'package',
      quantity: totalViews,
      price: value.package.price,
      currency: value.package.currency || 'INR',
    };

    // Ensure all videos have links constructed from videoId if missing
    const sanitizedVideos = value.videos.map(v => ({
      ...v,
      link: v.link || (v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : null)
    }));

    const order = await Order.create({
      orderId,
      userId: user._id,
      paymentId: payment._id,
      youtubeLink: sanitizedVideos[0]?.link,
      plan,
      status: 'payment_pending',
      campaignType: value.source,
      source: value.source,
      budget: value.budget,
      channel: value.channel,
      videos: sanitizedVideos,
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

    // Generate payment checkout URL pointing to frontend payment page
    const frontendUrl = process.env.FRONTEND_ORIGIN || process.env.CHECKOUT_URL || process.env.FRONTEND_PAYMENT_URL || 'http://localhost:5173';
    const paymentCheckoutUrl = `${frontendUrl}/payment/checkout?orderId=${orderId}`;

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
    
    // Get old status before update
    const oldOrder = await Order.findOne({ orderId });
    if (!oldOrder) return res.status(404).json({ message: 'Order not found' });
    const oldStatus = oldOrder.status;
    
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
    
    // Send status update email if status changed and user has email
    if (oldStatus !== value.status && order.userId?.email) {
      try {
        await sendStatusUpdateEmail(order.userId.email, order, oldStatus, value.status);
        console.log(`Status update email sent to ${order.userId.email} for order ${orderId}`);
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Don't fail the status update if email fails
      }
    }
    
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

exports.updateStats = async (req, res, next) => {
  try {
    const schema = Joi.object({
      viewsGenerated: Joi.number().min(0).default(0),
      subscribersGained: Joi.number().min(0).default(0),
      audienceReached: Joi.number().min(0).default(0),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate(
      { orderId },
      { 
        viewsGenerated: value.viewsGenerated,
        subscribersGained: value.subscribersGained,
        audienceReached: value.audienceReached
      },
      { new: true }
    );

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


