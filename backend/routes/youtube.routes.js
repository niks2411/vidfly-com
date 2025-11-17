const router = require('express').Router();
const { getVideoInfo } = require('../controllers/youtube.controller');

/**
 * @openapi
 * /api/youtube/info:
 *   post:
 *     summary: Get YouTube video information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video information retrieved
 */
router.post('/info', getVideoInfo);

module.exports = router;
