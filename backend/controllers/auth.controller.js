const crypto = require('crypto');
const Joi = require('joi');
const OtpToken = require('../models/OtpToken');
const User = require('../models/User');
const {
  EMAIL_COOKIE_NAME,
  EMAIL_COOKIE_MAX_AGE,
  buildEmailCookieValue,
} = require('../utils/emailVerification');
const { sendWelcomeEmail, sendOtpEmail } = require('../utils/emailService');

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
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log('Generated OTP for', email, ':', otp);

    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp, expiresAt });

    const result = await sendOtpEmail(email, otp);

    console.log('OTP email sent successfully:', result.messageId);
    return res.json({ message: 'OTP sent', id: result.messageId || undefined });
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
    res.cookie(EMAIL_COOKIE_NAME, cookieValue, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: EMAIL_COOKIE_MAX_AGE,
      path: '/',
    });

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

    return res.json({ message: 'OTP verified' });
  } catch (err) {
    return next(err);
  }
};
