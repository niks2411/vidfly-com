const router = require('express').Router();
const { sendOtp, verifyOtp, getMe, logout } = require('../controllers/auth.controller');

/**
 * @openapi
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/send-otp', sendOtp);

/**
 * @openapi
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post('/verify-otp', verifyOtp);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     responses:
 *       200:
 *         description: User info
 *       401:
 *         description: Not authenticated
 */
router.get('/me', getMe);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout and clear auth cookie
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', logout);

module.exports = router;
