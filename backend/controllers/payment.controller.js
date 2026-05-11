const Joi = require('joi');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const axios = require('axios');
const crypto = require('crypto');
const { sendPaymentSummaryEmail, sendAdminNewOrderNotification } = require('../utils/emailService');
const { awardReferralRewardOnFirstCampaign } = require('./freeViews.controller');

// Cashfree Payment Gateway Configuration
const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET || process.env.CASHFREE_SECRET_KEY;
// Default to TEST for safety - only use PRODUCTION when you have production credentials
let CASHFREE_ENVIRONMENT = (process.env.CASHFREE_ENVIRONMENT || 'TEST').toUpperCase();

// Safety check: If using test credentials, force TEST environment
// Test credentials typically start with specific patterns or are shorter
if (CASHFREE_ENVIRONMENT === 'PRODUCTION') {
  const clientIdLength = CASHFREE_CLIENT_ID?.length || 0;
  const clientSecretLength = CASHFREE_CLIENT_SECRET?.length || 0;

  // Test credentials are usually shorter or have specific patterns
  // If credentials look like test credentials, warn and use TEST
  if (clientIdLength < 20 || clientSecretLength < 30) {
    console.warn('⚠️ WARNING: CASHFREE_ENVIRONMENT is set to PRODUCTION but credentials look like TEST credentials.');
    console.warn('⚠️ Switching to TEST environment. Set CASHFREE_ENVIRONMENT=TEST in .env file.');
    CASHFREE_ENVIRONMENT = 'TEST';
  }
}

const CASHFREE_BASE_URL = CASHFREE_ENVIRONMENT === 'PRODUCTION'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

// Note: Cashfree Payment Gateway uses direct header authentication
// No separate token endpoint needed for PG API

exports.createPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({ orderId: Joi.string().required(), gateway: Joi.string().valid('razorpay', 'stripe', 'cashfree').required() });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId })
      .populate('paymentId')
      .populate('userId', 'name email phone');
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
    // Check credentials
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      console.error('Cashfree credentials missing:', {
        hasClientId: !!CASHFREE_CLIENT_ID,
        hasClientSecret: !!CASHFREE_CLIENT_SECRET,
        clientIdLength: CASHFREE_CLIENT_ID?.length || 0,
        clientSecretLength: CASHFREE_CLIENT_SECRET?.length || 0
      });
      return res.status(500).json({
        message: 'Cashfree Payment Gateway credentials not configured',
        hint: 'Please set CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET in .env file (PG credentials from Payment Gateway section, not Payout credentials)'
      });
    }

    console.log('Cashfree credentials loaded:', {
      hasClientId: !!CASHFREE_CLIENT_ID,
      hasClientSecret: !!CASHFREE_CLIENT_SECRET,
      environment: CASHFREE_ENVIRONMENT,
      baseUrl: CASHFREE_BASE_URL
    });

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

    // Verify credentials are set
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return res.status(500).json({
        message: 'Cashfree Payment Gateway credentials not configured',
        hint: 'Please set CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET in .env file (PG credentials from Cashfree Dashboard → Payment Gateway → Credentials)'
      });
    }

    // Verify environment matches
    if (CASHFREE_ENVIRONMENT !== 'TEST' && CASHFREE_ENVIRONMENT !== 'PRODUCTION') {
      console.warn(`Invalid CASHFREE_ENVIRONMENT: ${CASHFREE_ENVIRONMENT}, defaulting to TEST`);
    }

    const orderAmount = payment.amount;
    const currency = payment.currency || 'INR';

    // Generate unique payment gateway order ID: CF + orderId + timestamp + random
    const timestamp = Date.now();
    const randomSuffix = crypto.randomBytes(4).toString('hex').toUpperCase();
    const cashfreeOrderId = `CF_${order.orderId}_${timestamp}_${randomSuffix}`;

    // Validate order amount
    if (!orderAmount || orderAmount <= 0) {
      return res.status(400).json({
        message: 'Invalid order amount',
        amount: orderAmount
      });
    }

    // Create payment session data for Cashfree Payment Gateway
    const sessionData = {
      order_id: cashfreeOrderId,
      order_amount: orderAmount,
      order_currency: currency,
      customer_details: {
        customer_id: order.userId._id?.toString() || order.userId.toString(),
        customer_email: order.userId.email || 'customer@example.com',
        customer_phone: order.userId.phone || '0000000000',
        customer_name: order.userId.name || order.userId.email?.split('@')[0] || 'Customer',
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_ORIGIN}/payment/callback?orderId=${order.orderId}`,
        notify_url: `${process.env.BACKEND_ORIGIN}/api/payments/cashfree-webhook`,
      },
    };

    console.log('Creating Cashfree Payment Gateway order:', {
      environment: CASHFREE_ENVIRONMENT,
      baseUrl: CASHFREE_BASE_URL,
      orderId: cashfreeOrderId,
      amount: orderAmount,
      currency: currency,
      endpoint: `${CASHFREE_BASE_URL}/orders`
    });

    // Cashfree Payment Gateway uses direct header authentication with API version
    // Cashfree requires x-api-version header
    let response;
    let lastError = null;

    // Try different API versions and endpoints
    const apiVersions = ['2023-08-01', '2022-09-01', '2022-01-01', '2021-05-21'];
    const endpoints = [
      `${CASHFREE_BASE_URL}/orders`,
      `https://${CASHFREE_ENVIRONMENT === 'PRODUCTION' ? 'api' : 'sandbox'}.cashfree.com/pg/orders`,
    ];

    // Try each endpoint with each API version
    for (const endpoint of endpoints) {
      for (const apiVersion of apiVersions) {
        try {
          console.log(`Trying endpoint: ${endpoint} with API version: ${apiVersion}`);
          response = await axios.post(
            endpoint,
            sessionData,
            {
              headers: {
                'x-client-id': CASHFREE_CLIENT_ID,
                'x-client-secret': CASHFREE_CLIENT_SECRET,
                'x-api-version': apiVersion,
                'Content-Type': 'application/json',
              },
              timeout: 15000,
            }
          );
          console.log(`✅ Cashfree PG API call successful with endpoint: ${endpoint} and API version: ${apiVersion}`);
          break; // Success, exit both loops
        } catch (apiError) {
          lastError = apiError;
          const errorMsg = apiError.response?.data?.message || apiError.message;
          console.log(`❌ Failed with API version ${apiVersion}:`, {
            status: apiError.response?.status,
            message: errorMsg
          });

          // If we got a successful response structure but wrong version, continue trying
          // If we got 404, this endpoint is wrong, try next endpoint
          if (apiError.response?.status === 404) {
            break; // Try next endpoint
          }
        }
      }
      if (response) break; // If we got a response, exit endpoint loop
    }

    // If all endpoints failed
    if (!response) {
      console.error('All Cashfree API endpoints failed. Last error:', {
        status: lastError?.response?.status,
        statusText: lastError?.response?.statusText,
        data: lastError?.response?.data,
        message: lastError?.message,
      });

      return res.status(500).json({
        message: 'Failed to create Cashfree payment session',
        error: lastError?.response?.data?.message || lastError?.message || 'All API endpoints failed',
        details: lastError?.response?.data,
        status: lastError?.response?.status,
        hint: 'Please verify your CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET are correct (PG credentials from Payment Gateway section, not Payout credentials)'
      });
    }

    // Check if response has required data
    if (!response || !response.data) {
      console.error('Cashfree response is empty or invalid:', {
        hasResponse: !!response,
        hasData: response?.data ? true : false,
        status: response?.status,
        statusText: response?.statusText
      });
      return res.status(500).json({
        message: 'Invalid response from Cashfree API',
        details: 'No data received from Cashfree',
        hint: 'Check backend logs for more details'
      });
    }

    // Log full response for debugging
    console.log('Cashfree PG API response received:', JSON.stringify(response.data, null, 2));
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Check for payment_session_id and payment_url in various possible structures
    // Cashfree PG API may return data in different formats
    const paymentSessionId = response.data.payment_session_id
      || response.data.data?.payment_session_id
      || response.data.paymentSessionId
      || response.data.data?.paymentSessionId
      || response.data.session_id
      || response.data.data?.session_id;

    // Cashfree PG API returns payment_session_id but not payment_url
    // We need to construct the payment URL from the session ID
    let paymentUrl = response.data.payment_url
      || response.data.data?.payment_url
      || response.data.paymentUrl
      || response.data.data?.paymentUrl
      || response.data.url
      || response.data.data?.url;

    // If no payment_url in response, we primarily rely on paymentSessionId with the SDK
    if (!paymentUrl && paymentSessionId) {
      console.log('Relying on paymentSessionId for frontend SDK checkout');
    }

    if (!paymentSessionId) {
      console.error('Cashfree response missing payment_session_id:', {
        fullResponse: JSON.stringify(response.data, null, 2),
        responseKeys: Object.keys(response.data || {}),
        status: response.status
      });

      return res.status(500).json({
        message: 'Invalid response from Cashfree API',
        details: 'Payment session ID not received',
        responseStructure: response.data,
        hint: 'Check backend terminal for full response'
      });
    }

    console.log('Successfully extracted payment data:', {
      paymentSessionId: paymentSessionId.substring(0, 20) + '...',
      hasPaymentUrl: !!paymentUrl
    });

    // Update payment record
    payment.gateway = 'cashfree';
    payment.paymentOrderId = cashfreeOrderId;
    payment.status = 'created';
    payment.gatewayResponse = response.data;
    await payment.save();

    console.log('Cashfree payment session created successfully:', {
      orderId: order.orderId,
      cashfreeOrderId: cashfreeOrderId,
      paymentSessionId: paymentSessionId
    });

    return res.json({
      message: 'Cashfree payment session created',
      paymentSessionId: paymentSessionId,
      paymentUrl: paymentUrl,
      orderId: order.orderId,
    });
  } catch (error) {
    console.error('Cashfree payment creation error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      }
    });

    // Provide more detailed error message
    let errorMessage = 'Failed to create Cashfree payment session';
    let errorDetails = error.message;

    if (error.response) {
      errorDetails = error.response.data?.message || error.response.data?.error || error.response.statusText;
      if (error.response.status === 401) {
        errorMessage = 'Cashfree authentication failed. Please check your credentials.';
      } else if (error.response.status === 400) {
        errorMessage = 'Invalid payment request to Cashfree';
      }
    }

    return res.status(500).json({
      message: errorMessage,
      error: errorDetails,
      hint: 'Check backend logs for more details'
    });
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      orderId: Joi.string().required(),
      paymentId: Joi.string().allow('', null).optional(),
      signature: Joi.string().allow(''),
      gateway: Joi.string().valid('razorpay', 'stripe', 'cashfree').optional()
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId }).populate('paymentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // If Cashfree, verify using Cashfree API (paymentId optional for test mode)
    if (value.gateway === 'cashfree' || order.paymentId?.gateway === 'cashfree') {
      return await verifyCashfreePayment(req, res, next, order, value.paymentId || null);
    }

    // For other gateways, paymentId is required
    if (!value.paymentId) {
      return res.status(400).json({ message: 'Payment ID is required for this gateway' });
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
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return res.status(500).json({ message: 'Cashfree Payment Gateway credentials not configured' });
    }
    const payment = order.paymentId;

    if (!payment || !payment.paymentOrderId) {
      return res.status(404).json({ message: 'Payment order not found' });
    }

    // Get payment status from Cashfree Payment Gateway
    const response = await axios.get(
      `${CASHFREE_BASE_URL}/orders/${payment.paymentOrderId}/payments`,
      {
        headers: {
          'x-client-id': CASHFREE_CLIENT_ID,
          'x-client-secret': CASHFREE_CLIENT_SECRET,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json',
        },
      }
    );

    // If paymentId provided, find specific payment, otherwise get latest successful payment
    let paymentData;
    if (paymentId) {
      paymentData = response.data.find(p => p.cf_payment_id === paymentId);
      if (!paymentData) {
        return res.status(404).json({ message: 'Payment not found in Cashfree' });
      }
    } else {
      // No paymentId - get the latest successful payment
      paymentData = response.data.find(p => p.payment_status === 'SUCCESS');
      if (!paymentData) {
        // Check if there are any payments at all
        if (response.data && response.data.length > 0) {
          // Get the latest payment
          paymentData = response.data[response.data.length - 1];
        } else {
          return res.status(404).json({ message: 'No payments found for this order' });
        }
      }
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

      // Send payment summary email
      try {
        const populatedOrder = await Order.findById(order._id)
          .populate('userId', 'email name');
        if (populatedOrder?.userId?.email) {
          await sendPaymentSummaryEmail(populatedOrder.userId.email, populatedOrder, payment);
          console.log(`Payment summary email sent to ${populatedOrder.userId.email}`);
          
          // Send admin notification
          await sendAdminNewOrderNotification(populatedOrder, payment);
          console.log(`Admin notification email sent for order ${populatedOrder.orderId}`);
        }
      } catch (emailError) {
        console.error('Failed to send payment summary email:', emailError);
        // Don't fail the payment verification if email fails
      }

      // Award referral reward if this is the referred user's first campaign
      try {
        const rewardResult = await awardReferralRewardOnFirstCampaign(order.userId, order._id);
        if (rewardResult) {
          console.log(`Referral reward awarded: ${rewardResult.viewsAwarded} views to ${rewardResult.referrerEmail}`);
        }
      } catch (referralError) {
        console.error('Failed to award referral reward:', referralError);
        // Don't fail the payment if referral reward fails
      }

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

// Verify payment using only orderId (for test mode when paymentId not in URL)
exports.verifyOrderPayment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      orderId: Joi.string().required(),
      gateway: Joi.string().valid('razorpay', 'stripe', 'cashfree').optional()
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const order = await Order.findOne({ orderId: value.orderId }).populate('paymentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // If Cashfree, verify using Cashfree API without paymentId
    if (value.gateway === 'cashfree' || order.paymentId?.gateway === 'cashfree') {
      return await verifyCashfreePayment(req, res, next, order, null);
    }

    return res.status(400).json({ message: 'Payment gateway not supported for order verification' });
  } catch (err) {
    return next(err);
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

      // Send payment summary email
      try {
        const populatedOrder = await Order.findById(order._id)
          .populate('userId', 'email name');
        if (populatedOrder?.userId?.email) {
          await sendPaymentSummaryEmail(populatedOrder.userId.email, populatedOrder, payment);
          console.log(`Payment summary email sent to ${populatedOrder.userId.email} via webhook`);

          // Send admin notification
          await sendAdminNewOrderNotification(populatedOrder, payment);
          console.log(`Admin notification email sent for order ${populatedOrder.orderId} via webhook`);
        }
      } catch (emailError) {
        console.error('Failed to send payment summary email via webhook:', emailError);
        // Don't fail the webhook if email fails
      }

      // Award referral reward if this is the referred user's first campaign
      try {
        const rewardResult = await awardReferralRewardOnFirstCampaign(order.userId, order._id);
        if (rewardResult) {
          console.log(`Referral reward awarded via webhook: ${rewardResult.viewsAwarded} views to ${rewardResult.referrerEmail}`);
        }
      } catch (referralError) {
        console.error('Failed to award referral reward via webhook:', referralError);
        // Don't fail the webhook if referral reward fails
      }
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


