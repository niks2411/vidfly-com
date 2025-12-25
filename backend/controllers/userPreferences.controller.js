const Joi = require('joi');
const User = require('../models/User');
const {
  EMAIL_COOKIE_NAME,
  verifyEmailCookieValue,
} = require('../utils/emailVerification');

// Add channel to user's channel list
exports.addChannel = async (req, res, next) => {
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

    // Initialize preferences if needed
    if (!user.preferences) {
      user.preferences = { channels: [] };
    }
    if (!user.preferences.channels) {
      user.preferences.channels = [];
    }

    // Check if channel already exists
    const channelExists = user.preferences.channels.some(
      (ch) => ch.channelId === value.channelId
    );

    if (!channelExists) {
      // Add new channel
      user.preferences.channels.push({
        channelId: value.channelId,
        channelName: value.channelName || '',
        addedAt: new Date(),
      });
    } else {
      // Update existing channel name if provided
      const channelIndex = user.preferences.channels.findIndex(
        (ch) => ch.channelId === value.channelId
      );
      if (channelIndex !== -1 && value.channelName) {
        user.preferences.channels[channelIndex].channelName = value.channelName;
      }
    }

    // Set as selected channel
    user.preferences.selectedChannelId = value.channelId;
    if (value.channelName) {
      user.preferences.selectedChannelName = value.channelName;
    }

    await user.save();

    return res.json({ 
      message: 'Channel added successfully',
      channelId: value.channelId,
      channelName: value.channelName
    });
  } catch (err) {
    return next(err);
  }
};

// Save selected channel for user (for backward compatibility)
exports.saveSelectedChannel = async (req, res, next) => {
  // Use addChannel internally
  return exports.addChannel(req, res, next);
};

// Get all channels for user
exports.getAllChannels = async (req, res, next) => {
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
    if (!user || !user.preferences || !user.preferences.channels || user.preferences.channels.length === 0) {
      return res.json({ 
        channels: [],
        selectedChannelId: null,
        selectedChannelName: null
      });
    }

    return res.json({
      channels: user.preferences.channels.map(ch => ({
        channelId: ch.channelId,
        channelName: ch.channelName,
        addedAt: ch.addedAt,
      })),
      selectedChannelId: user.preferences.selectedChannelId || null,
      selectedChannelName: user.preferences.selectedChannelName || null
    });
  } catch (err) {
    return next(err);
  }
};

// Get selected channel for user (for backward compatibility)
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

// Remove channel from user's channel list
exports.removeChannel = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      channelId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const normalizedEmail = value.email.toLowerCase().trim();
    
    // Verify email cookie
    const cookieValue = req.cookies[EMAIL_COOKIE_NAME];
    if (!cookieValue || !verifyEmailCookieValue(cookieValue, normalizedEmail)) {
      return res.status(401).json({ message: 'Email verification required' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize preferences if needed
    if (!user.preferences) {
      user.preferences = { channels: [] };
    }
    if (!user.preferences.channels) {
      user.preferences.channels = [];
    }

    // Remove channel from list
    const initialLength = user.preferences.channels.length;
    user.preferences.channels = user.preferences.channels.filter(
      (ch) => ch.channelId !== value.channelId
    );

    // If this was the selected channel, clear selection
    if (user.preferences.selectedChannelId === value.channelId) {
      user.preferences.selectedChannelId = null;
      user.preferences.selectedChannelName = null;
      
      // Auto-select first remaining channel if any
      if (user.preferences.channels.length > 0) {
        const firstChannel = user.preferences.channels[0];
        user.preferences.selectedChannelId = firstChannel.channelId;
        user.preferences.selectedChannelName = firstChannel.channelName || null;
      }
    }

    // Only save if something changed
    if (user.preferences.channels.length !== initialLength) {
      await user.save();
    }

    return res.json({ 
      message: 'Channel removed successfully',
      channelId: value.channelId
    });
  } catch (err) {
    return next(err);
  }
};

