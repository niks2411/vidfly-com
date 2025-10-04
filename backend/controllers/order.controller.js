const crypto = require('crypto');
const Joi = require('joi');
const Order = require('../models/Order');
const User = require('../models/User');
const Payment = require('../models/Payment');
const OtpToken = require('../models/OtpToken');

const createOrderSchema = Joi.object({
  customerName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(''),
  youtubeLink: Joi.string().uri().allow('', null),
  plan: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid('views', 'subscribers', 'watch_time', 'likes').required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    currency: Joi.string().default('INR'),
  }).required(),
});

exports.createOrder = async (req, res, next) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // Check if email is verified
    const verifiedOtp = await OtpToken.findOne({ 
      email: value.email.toLowerCase(), 
      verified: true 
    });
    
    if (!verifiedOtp) {
      return res.status(400).json({ 
        message: 'Email verification required. Please verify your email before submitting the order.',
        code: 'EMAIL_NOT_VERIFIED'
      });
    }

    const orderId = 'VID' + crypto.randomBytes(6).toString('hex').toUpperCase();
    
    // Create or find user
    let user = await User.findOne({ email: value.email.toLowerCase() });
    if (!user) {
      user = await User.create({
        name: value.customerName,
        email: value.email.toLowerCase(),
        phone: value.phone,
        emailVerified: true,
      });
    } else {
      // Update user info if needed
      user.name = value.customerName;
      user.phone = value.phone || user.phone;
      user.emailVerified = true;
      await user.save();
    }

    // Create payment record
    const payment = await Payment.create({
      orderId,
      userId: user._id,
      amount: value.plan.price,
      currency: value.plan.currency || 'INR',
      gateway: 'razorpay', // Default gateway
      status: 'pending',
    });

    // Create order
    const order = await Order.create({
      orderId,
      userId: user._id,
      paymentId: payment._id,
      youtubeLink: value.youtubeLink,
      plan: value.plan,
      status: 'payment_pending',
    });
    
    // Clean up the used OTP token
    await OtpToken.deleteOne({ _id: verifiedOtp._id });
    
    // Populate the response with user and payment data
    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway');

    return res.status(201).json(populatedOrder);
  } catch (err) {
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


