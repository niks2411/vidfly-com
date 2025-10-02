const crypto = require('crypto');
const Joi = require('joi');
const Order = require('../models/Order');
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
    const order = await Order.create({
      orderId,
      ...value,
      status: 'Payment Pending',
      emailVerified: true
    });
    
    // Clean up the used OTP token
    await OtpToken.deleteOne({ _id: verifiedOtp._id });
    
    return res.status(201).json(order);
  } catch (err) {
    return next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const schema = Joi.object({ status: Joi.string().valid('Pending','Payment Pending','Paid','Promotion Scheduled','In Progress','Completed','Failed').required() });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate({ orderId }, { status: value.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};


