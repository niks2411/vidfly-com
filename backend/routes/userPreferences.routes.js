const router = require('express').Router();
const { saveSelectedChannel, getSelectedChannel } = require('../controllers/userPreferences.controller');

/**
 * @openapi
 * /api/user-preferences/channel:
 *   post:
 *     summary: Save selected channel for user
 *   get:
 *     summary: Get selected channel for user
 */
router.post('/channel', saveSelectedChannel);
router.get('/channel', getSelectedChannel);

module.exports = router;

