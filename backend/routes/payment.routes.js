const router = require('express').Router();
const { createPayment, verifyPayment, cashfreeWebhook } = require('../controllers/payment.controller');

/**
 * @openapi
 * /api/payments/create:
 *   post:
 *     summary: Create payment order
 */
router.post('/create', createPayment);

/**
 * @openapi
 * /api/payments/verify:
 *   post:
 *     summary: Verify payment and update order
 */
router.post('/verify', verifyPayment);

/**
 * @openapi
 * /api/payments/cashfree-webhook:
 *   post:
 *     summary: Cashfree webhook handler
 */
router.post('/cashfree-webhook', cashfreeWebhook);

module.exports = router;


