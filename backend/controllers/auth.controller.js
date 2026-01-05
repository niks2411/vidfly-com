const crypto = require('crypto');
const Joi = require('joi');
const OtpToken = require('../models/OtpToken');
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
    const record = await OtpToken.findOne({ email: email.toLowerCase(), otp });
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

    // Send welcome email after successful verification
    try {
      await sendWelcomeEmail(email);
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the verification if email fails
    }

    return res.json({ message: 'OTP verified' });
  } catch (err) {
    return next(err);
  }
};


