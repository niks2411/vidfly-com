const router = require('express').Router();
const { createPayment, verifyPayment } = require('../controllers/payment.controller');

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

module.exports = router;


