const router = require('express').Router();
const { sendOtp, verifyOtp, getMe, logout, googleCallback } = require('../controllers/auth.controller');
const passport = require('../config/passport');

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

/**
 * @openapi
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     responses:
 *       302:
 *         description: Redirect to Google consent screen
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @openapi
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     responses:
 *       302:
 *         description: Redirect to frontend with auth cookie
 */
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || process.env.FRONTEND_ORIGIN || 'http://localhost:3000'}/?error=auth_failed`,
  }),
  googleCallback
);

module.exports = router;
