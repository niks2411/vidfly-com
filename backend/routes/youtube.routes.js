const router = require('express').Router();
const {
    getVideoInfo,
    getChannelVideos,
    getChannelInfo,
    clearCache,
    getCacheStats
} = require('../controllers/youtube.controller');

/**
 * @openapi
 * /api/youtube/info:
 *   post:
 *     summary: Get YouTube video information (uses oEmbed for free, API as fallback)
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

/**
 * @openapi
 * /api/youtube/channel-videos:
 *   get:
 *     summary: Get videos from a channel (quota-optimized using playlistItems)
 *     parameters:
 *       - name: channelId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Channel videos retrieved
 */
router.get('/channel-videos', getChannelVideos);
router.get('/channel-info', getChannelInfo);

// Cache management (admin endpoints)
router.post('/cache/clear', clearCache);
router.get('/cache/stats', getCacheStats);

module.exports = router;

