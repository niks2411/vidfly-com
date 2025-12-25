const router = require('express').Router();
const { saveSelectedChannel, getSelectedChannel, addChannel, getAllChannels, removeChannel } = require('../controllers/userPreferences.controller');

/**
 * @openapi
 * /api/user-preferences/channel:
 *   post:
 *     summary: Add channel to user's channel list
 *   get:
 *     summary: Get selected channel for user (backward compatibility)
 */
router.post('/channel', saveSelectedChannel);
router.get('/channel', getSelectedChannel);

/**
 * @openapi
 * /api/user-preferences/channels:
 *   get:
 *     summary: Get all channels for user
 *   post:
 *     summary: Add a new channel to user's channel list
 *   delete:
 *     summary: Remove a channel from user's channel list
 */
router.get('/channels', getAllChannels);
router.post('/channels', addChannel);
router.delete('/channels', removeChannel);

module.exports = router;

