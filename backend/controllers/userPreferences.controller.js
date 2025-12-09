const Joi = require('joi');
const User = require('../models/User');
const {
  EMAIL_COOKIE_NAME,
  verifyEmailCookieValue,
} = require('../utils/emailVerification');

// Save selected channel for user
exports.saveSelectedChannel = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      channelId: Joi.string().required(),
      channelName: Joi.string().allow('', null),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const normalizedEmail = value.email.toLowerCase().trim();
    
    // Verify email cookie
    const cookieValue = req.cookies[EMAIL_COOKIE_NAME];
    if (!cookieValue || !verifyEmailCookieValue(cookieValue, normalizedEmail)) {
      return res.status(401).json({ message: 'Email verification required' });
    }

    // Find or create user
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user preferences
    if (!user.preferences) {
      user.preferences = {};
    }
    user.preferences.selectedChannelId = value.channelId;
    if (value.channelName) {
      user.preferences.selectedChannelName = value.channelName;
    }
    await user.save();

    return res.json({ 
      message: 'Selected channel saved successfully',
      channelId: value.channelId,
      channelName: value.channelName
    });
  } catch (err) {
    return next(err);
  }
};

// Get selected channel for user
exports.getSelectedChannel = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Verify email cookie
    const cookieValue = req.cookies[EMAIL_COOKIE_NAME];
    if (!cookieValue || !verifyEmailCookieValue(cookieValue, normalizedEmail)) {
      return res.status(401).json({ message: 'Email verification required' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !user.preferences || !user.preferences.selectedChannelId) {
      return res.json({ channelId: null, channelName: null });
    }

    return res.json({
      channelId: user.preferences.selectedChannelId,
      channelName: user.preferences.selectedChannelName || null
    });
  } catch (err) {
    return next(err);
  }
};

