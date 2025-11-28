const router = require('express').Router();
const { getVideoInfo, getChannelVideos, getChannelInfo } = require('../controllers/youtube.controller');

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
router.get('/channel-videos', getChannelVideos);
router.get('/channel-info', getChannelInfo);

module.exports = router;

