const Joi = require('joi');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const axios = require('axios');
const crypto = require('crypto');

// Cashfree Configuration
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_ENVIRONMENT = process.env.CASHFREE_ENVIRONMENT || 'TEST';
const CASHFREE_BASE_URL = CASHFREE_ENVIRONMENT === 'PRODUCTION' 
  ? 'https://api.cashfree.com' 
  : 'https://sandbox.cashfree.com';

// Get Cashfree Auth Token
const getCashfreeToken = async () => {
  try {
    const response = await axios.post(
      `${CASHFREE_BASE_URL}/pg/v1/authorize`,
      {},
      {
        headers: {
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY,
          'x-api-version': '2023-08-01',
        },
      }
    );
    return response.data.data.token;
  } catch (error) {
    console.error('Cashfree auth error:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Cashfree');
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({ orderId: Joi.string().required(), gateway: Joi.string().valid('razorpay','stripe','cashfree').required() });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId }).populate('paymentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // If Cashfree, create payment session
    if (value.gateway === 'cashfree') {
      return await createCashfreePayment(req, res, next, order);
    }

    // Placeholder for other gateways
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

// Create Cashfree Payment Session
const createCashfreePayment = async (req, res, next, order) => {
  try {
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return res.status(500).json({ message: 'Cashfree credentials not configured' });
    }

    const payment = order.paymentId || await Payment.findOne({ orderId: order.orderId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    // Check if payment session already exists and is still valid
    if (payment.paymentOrderId && payment.status === 'created') {
      // Check if payment session is still valid (not expired - typically 30 minutes)
      const sessionAge = Date.now() - new Date(payment.updatedAt).getTime();
      const sessionMaxAge = 30 * 60 * 1000; // 30 minutes
      
      if (sessionAge < sessionMaxAge) {
        // Return existing payment session
        return res.json({
          message: 'Payment session already exists',
          paymentSessionId: payment.gatewayResponse?.payment_session_id,
          paymentUrl: payment.gatewayResponse?.payment_url,
          orderId: order.orderId,
        });
      }
    }

    // Check if payment is already completed
    if (payment.status === 'captured' || payment.status === 'authorized') {
      return res.status(400).json({ 
        message: 'Payment already completed for this order',
        orderId: order.orderId 
      });
    }

    // Verify payment amount matches order amount
    const expectedAmount = order.plan?.price || order.packageInfo?.price;
    if (expectedAmount && Math.abs(payment.amount - expectedAmount) > 0.01) {
      return res.status(400).json({ 
        message: 'Payment amount mismatch. Please contact support.',
        orderId: order.orderId 
      });
    }

    const token = await getCashfreeToken();
    const orderAmount = payment.amount;
    const currency = payment.currency || 'INR';
    
    // Generate unique payment gateway order ID: CF + orderId + timestamp + random
    const timestamp = Date.now();
    const randomSuffix = crypto.randomBytes(4).toString('hex').toUpperCase();
    const orderId = `CF_${order.orderId}_${timestamp}_${randomSuffix}`;

    // Create payment session
    const sessionData = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: currency,
      customer_details: {
        customer_id: order.userId.toString(),
        customer_email: order.userId.email || 'customer@example.com',
        customer_phone: order.userId.phone || '9999999999',
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/payment/callback?orderId=${order.orderId}`,
        notify_url: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/cashfree-webhook`,
      },
    };

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/pg/v1/orders`,
      sessionData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json',
        },
      }
    );

    // Update payment record
    payment.gateway = 'cashfree';
    payment.paymentOrderId = orderId;
    payment.status = 'created';
    payment.gatewayResponse = response.data;
    await payment.save();

    return res.json({
      message: 'Cashfree payment session created',
      paymentSessionId: response.data.payment_session_id,
      paymentUrl: response.data.payment_url,
      orderId: order.orderId,
    });
  } catch (error) {
    console.error('Cashfree payment creation error:', error.response?.data || error.message);
    return res.status(500).json({ 
      message: 'Failed to create Cashfree payment session',
      error: error.response?.data?.message || error.message 
    });
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({ 
      orderId: Joi.string().required(), 
      paymentId: Joi.string().required(), 
      signature: Joi.string().allow(''),
      gateway: Joi.string().valid('razorpay', 'stripe', 'cashfree').optional()
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId }).populate('paymentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // If Cashfree, verify using Cashfree API
    if (value.gateway === 'cashfree' || order.paymentId?.gateway === 'cashfree') {
      return await verifyCashfreePayment(req, res, next, order, value.paymentId);
    }

    // Placeholder verification for other gateways
    const payment = order.paymentId;
    if (payment) {
      payment.paymentId = value.paymentId;
      payment.signature = value.signature;
      payment.status = 'captured';
      await payment.save();
    }
    
    order.status = 'paid';
    await order.save();
    return res.json({ message: 'Payment verified', order });
  } catch (err) { return next(err); }
};

// Verify Cashfree Payment
const verifyCashfreePayment = async (req, res, next, order, paymentId) => {
  try {
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return res.status(500).json({ message: 'Cashfree credentials not configured' });
    }

    const token = await getCashfreeToken();
    const payment = order.paymentId;
    
    if (!payment || !payment.paymentOrderId) {
      return res.status(404).json({ message: 'Payment order not found' });
    }

    // Get payment status from Cashfree
    const response = await axios.get(
      `${CASHFREE_BASE_URL}/pg/v1/orders/${payment.paymentOrderId}/payments`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-version': '2023-08-01',
        },
      }
    );

    const paymentData = response.data.find(p => p.cf_payment_id === paymentId);
    if (!paymentData) {
      return res.status(404).json({ message: 'Payment not found in Cashfree' });
    }

    // Update payment record
    payment.paymentId = paymentData.cf_payment_id;
    payment.status = paymentData.payment_status === 'SUCCESS' ? 'captured' : 'failed';
    payment.gatewayResponse = paymentData;
    if (paymentData.payment_message) {
      payment.failureReason = paymentData.payment_message;
    }
    await payment.save();

    // Update order status
    if (paymentData.payment_status === 'SUCCESS') {
      order.status = 'paid';
      await order.save();
      return res.json({ message: 'Payment verified successfully', order });
    } else {
      order.status = 'failed';
      await order.save();
      return res.status(400).json({ 
        message: 'Payment failed', 
        reason: paymentData.payment_message 
      });
    }
  } catch (error) {
    console.error('Cashfree verification error:', error.response?.data || error.message);
    return res.status(500).json({ 
      message: 'Failed to verify Cashfree payment',
      error: error.response?.data?.message || error.message 
    });
  }
};

// Cashfree Webhook Handler
exports.cashfreeWebhook = async (req, res, next) => {
  try {
    const webhookData = req.body;
    const signature = req.headers['x-cashfree-signature'];
    
    // Verify webhook signature for security
    if (process.env.CASHFREE_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.CASHFREE_WEBHOOK_SECRET)
        .update(JSON.stringify(webhookData))
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature:', { received: signature, expected: expectedSignature });
        return res.status(401).json({ message: 'Invalid webhook signature' });
      }
    } else {
      console.warn('CASHFREE_WEBHOOK_SECRET not set - webhook signature verification disabled');
    }

    const { orderId, paymentId, paymentStatus } = webhookData.data || {};
    
    if (!orderId || !paymentId) {
      return res.status(400).json({ message: 'Missing orderId or paymentId' });
    }

    // Find order by Cashfree order ID
    const payment = await Payment.findOne({ paymentOrderId: orderId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const order = await Order.findOne({ orderId: payment.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Prevent duplicate processing - check if payment already processed
    if (payment.status === 'captured' && paymentStatus === 'SUCCESS') {
      console.log(`Payment ${paymentId} already processed for order ${order.orderId}`);
      return res.json({ message: 'Payment already processed' });
    }

    // Verify payment amount matches order amount
    const webhookAmount = webhookData.data?.order_amount || webhookData.data?.payment_amount;
    if (webhookAmount && Math.abs(payment.amount - webhookAmount) > 0.01) {
      console.error('Payment amount mismatch in webhook:', {
        expected: payment.amount,
        received: webhookAmount,
        orderId: order.orderId
      });
      return res.status(400).json({ message: 'Payment amount mismatch' });
    }

    // Update payment status
    payment.paymentId = paymentId;
    payment.status = paymentStatus === 'SUCCESS' ? 'captured' : 'failed';
    payment.gatewayResponse = webhookData;
    if (paymentStatus === 'FAILED' && webhookData.data?.payment_message) {
      payment.failureReason = webhookData.data.payment_message;
    }
    await payment.save();

    // Update order status
    if (paymentStatus === 'SUCCESS') {
      order.status = 'paid';
      await order.save();
    } else if (paymentStatus === 'FAILED') {
      order.status = 'failed';
      await order.save();
    }

    return res.json({ message: 'Webhook processed successfully' });
  } catch (err) {
    console.error('Cashfree webhook error:', err);
    return next(err);
  }
};


