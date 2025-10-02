const Joi = require('joi');
const Order = require('../models/Order');

exports.createPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({ orderId: Joi.string().required(), gateway: Joi.string().valid('razorpay','stripe').required() });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Placeholder: In real integration, call Razorpay/Stripe SDKs
    order.payment = {
      gateway: value.gateway,
      paymentOrderId: 'pay_order_' + order.orderId,
      amount: order.plan.price,
      currency: order.plan.currency || 'INR',
      status: 'created',
    };
    await order.save();
    return res.json({ message: 'Payment order created', payment: order.payment });
  } catch (err) { return next(err); }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({ orderId: Joi.string().required(), paymentId: Joi.string().required(), signature: Joi.string().allow('') });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Placeholder verification ok
    order.payment = {
      ...order.payment,
      paymentId: value.paymentId,
      signature: value.signature,
      status: 'captured',
    };
    order.status = 'Paid';
    await order.save();
    return res.json({ message: 'Payment verified', order });
  } catch (err) { return next(err); }
};


