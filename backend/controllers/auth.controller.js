const crypto = require('crypto');
const Joi = require('joi');
const nodemailer = require('nodemailer');
const OtpToken = require('../models/OtpToken');
const {
  EMAIL_COOKIE_NAME,
  EMAIL_COOKIE_MAX_AGE,
  buildEmailCookieValue,
} = require('../utils/emailVerification');

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

function createTransport() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return nodemailer.createTransport({ jsonTransport: true });
}

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

    const transporter = createTransport();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'no-reply@vidflyy.com',
      to: email,
      subject: 'Your Vidflyy OTP',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    console.log('Email sent successfully:', info.messageId);
    return res.json({ message: 'OTP sent', id: info.messageId || undefined });
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

    return res.json({ message: 'OTP verified' });
  } catch (err) {
    return next(err);
  }
};


