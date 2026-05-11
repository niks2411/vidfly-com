const router = require('express').Router();
const { calculateViews, getPricingTiers } = require('../controllers/pricing.controller');

/**
 * @openapi
 * /api/pricing/calculate:
 *   post:
 *     summary: Calculate views based on custom price
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Views calculation result
 */
router.post('/calculate', calculateViews);

/**
 * @openapi
 * /api/pricing/tiers:
 *   get:
 *     summary: Get pricing tiers information
 *     responses:
 *       200:
 *         description: Pricing tiers
 */
router.get('/tiers', getPricingTiers);

module.exports = router;


