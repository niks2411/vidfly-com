const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const OtpToken = require('../models/OtpToken');
const User = require('../models/User');
const {
  EMAIL_COOKIE_NAME,
  EMAIL_COOKIE_MAX_AGE,
  buildEmailCookieValue,
} = require('../utils/emailVerification');
const { sendWelcomeEmail, sendOtpEmail } = require('../utils/emailService');

const AUTH_COOKIE_NAME = 'vidfly_token';
const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const parseBooleanEnv = (value, fallback) => {
  if (value === undefined) return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
};

const buildCookieOptions = (maxAge) => {
  const secure = parseBooleanEnv(
    process.env.AUTH_COOKIE_SECURE,
    process.env.NODE_ENV === 'production' || (process.env.BACKEND_ORIGIN && process.env.BACKEND_ORIGIN.startsWith('https://'))
  );
  const sameSiteRaw = (process.env.AUTH_COOKIE_SAME_SITE || (secure ? 'none' : 'lax')).toLowerCase();
  const sameSite = ['lax', 'strict', 'none'].includes(sameSiteRaw) ? sameSiteRaw : 'lax';
  const configuredDomain = process.env.AUTH_COOKIE_DOMAIN;
  const domain = configuredDomain && configuredDomain.trim() ? configuredDomain.trim() : undefined;

  const options = {
    httpOnly: true,
    sameSite,
    secure,
    maxAge,
    path: '/',
  };

  if (domain) {
    options.domain = domain;
  } else if (process.env.NODE_ENV === 'production' || (process.env.BACKEND_ORIGIN && process.env.BACKEND_ORIGIN.includes('vidflyy.com'))) {
    options.domain = '.vidflyy.com';
  }

  return options;
};

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

exports.sendOtp = async (req, res, next) => {
  try {
    console.log('Send OTP request received:', req.body);
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      console.log('Validation error:', error.message);
      return res.status(400).json({ message: error.message });
    }

    const email = value.email.toLowerCase();
    
    // Check if OTP was recently sent and limit resends
    const existingToken = await OtpToken.findOne({ email });
    let resendCount = 1;

    if (existingToken) {
      if (existingToken.count >= 3) {
        console.log(`OTP resend limit reached for ${email}`);
        return res.status(429).json({ 
          message: 'OTP resend limit reached. Please try again after 10 minutes.' 
        });
      }
      resendCount = existingToken.count + 1;
      await OtpToken.deleteMany({ email });
    }

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log(`Generated OTP for ${email} (Attempt ${resendCount}): ${otp}`);

    await OtpToken.create({ email, otp, expiresAt, count: resendCount });

    const result = await sendOtpEmail(email, otp);

    console.log('OTP email sent successfully:', result.messageId);
    return res.json({ 
      message: 'OTP sent', 
      id: result.messageId || undefined,
      resendCount
    });
  } catch (err) {
    console.error('Send OTP error:', err);
    return next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required(), otp: Joi.string().length(6).required() });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, otp } = value;
    const normalizedEmail = email.toLowerCase();

    const record = await OtpToken.findOne({ email: normalizedEmail, otp });
    if (!record) return res.status(400).json({ message: 'Invalid OTP' });
    if (record.expiresAt < new Date()) return res.status(400).json({ message: 'OTP expired' });

    record.verified = true;
    await record.save();

    const cookieValue = buildEmailCookieValue(email);
    res.cookie(EMAIL_COOKIE_NAME, cookieValue, buildCookieOptions(EMAIL_COOKIE_MAX_AGE));

    // Check if user already exists in database
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (!existingUser) {
      // This is a first-time user - send welcome email and create user record
      console.log(`First-time user detected: ${normalizedEmail}`);

      // Create user record in database
      try {
        await User.create({
          name: normalizedEmail.split('@')[0], // Use email prefix as default name
          email: normalizedEmail,
          emailVerified: true,
        });
        console.log(`User record created for ${normalizedEmail}`);
      } catch (createError) {
        // If user creation fails (e.g., duplicate key), log but don't fail
        console.warn('Failed to create user record:', createError.message);
      }

      // Send welcome email only to first-time users
      try {
        await sendWelcomeEmail(normalizedEmail);
        console.log(`Welcome email sent to first-time user: ${normalizedEmail}`);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the verification if email fails
      }
    } else {
      // Existing user logging in again - update emailVerified status, skip welcome email
      console.log(`Returning user detected: ${normalizedEmail} - skipping welcome email`);
      if (!existingUser.emailVerified) {
        existingUser.emailVerified = true;
        await existingUser.save();
      }
    }

    // Generate JWT and set as HTTPOnly cookie
    const jwtPayload = { email: normalizedEmail, userId: existingUser ? existingUser._id : undefined };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie(AUTH_COOKIE_NAME, token, buildCookieOptions(AUTH_COOKIE_MAX_AGE));

    return res.json({ message: 'OTP verified', email: normalizedEmail });
  } catch (err) {
    return next(err);
  }
};

// GET /api/auth/me — Return current authenticated user from cookie
exports.getMe = async (req, res) => {
  try {
    const token = req.cookies[AUTH_COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).select('-__v');
    if (!user) return res.status(401).json({ message: 'User not found' });

    return res.json({ user: { email: user.email, name: user.name, id: user._id, avatar: user.avatar, googleId: user.googleId } });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// POST /api/auth/logout — Clear the auth cookie
exports.logout = (req, res) => {
  const { maxAge, ...clearOptions } = buildCookieOptions(AUTH_COOKIE_MAX_AGE);
  res.clearCookie(AUTH_COOKIE_NAME, clearOptions);
  return res.json({ message: 'Logged out' });
};

// GET /api/auth/google/callback — Handle Google OAuth callback
exports.googleCallback = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || process.env.FRONTEND_ORIGIN}/?error=auth_failed`);
    }

    // Generate JWT (same as OTP flow)
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTPOnly cookie (same as OTP flow)
    res.cookie(AUTH_COOKIE_NAME, token, buildCookieOptions(AUTH_COOKIE_MAX_AGE));

    // Redirect to frontend
    const frontendUrl = process.env.FRONTEND_URL || process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/campaign`);
  } catch (err) {
    console.error('Google callback error:', err);
    const frontendUrl = process.env.FRONTEND_URL || process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/?error=auth_failed`);
  }
};
