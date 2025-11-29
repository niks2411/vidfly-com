const router = require('express').Router();
const { getBalance, applyReferralCode } = require('../controllers/freeViews.controller');

/**
 * @openapi
 * /api/free-views/balance:
 *   get:
 *     summary: Get free views balance and referral stats
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Balance and stats retrieved
 */
router.get('/balance', getBalance);

/**
 * @openapi
 * /api/free-views/apply-referral:
 *   post:
 *     summary: Apply a referral code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               referralCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Referral code applied successfully
 */
router.post('/apply-referral', applyReferralCode);

module.exports = router;


