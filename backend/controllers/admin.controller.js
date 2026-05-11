const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const AdminUser = require('../models/AdminUser');
const Order = require('../models/Order');
const User = require('../models/User');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    return res.json({
      totalUsers,
    });
  } catch (err) { return next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const schema = Joi.object({ username: Joi.string().required(), password: Joi.string().required() });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const admin = await AdminUser.findOne({ username: value.username.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(value.password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, role: admin.role, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token });
  } catch (err) { return next(err); }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway paymentOrderId paymentId')
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) { return next(err); }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate('userId', 'name email phone emailVerified')
      .populate('paymentId', 'amount currency status gateway paymentOrderId paymentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (err) { return next(err); }
};

exports.markRead = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { isRead: true },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json({ success: true });
  } catch (err) { return next(err); }
};
