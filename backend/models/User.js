const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    googleId: { type: String, sparse: true, index: true },
    avatar: { type: String },
    phone: { type: String },
    emailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    referralCode: { type: String, unique: true, sparse: true, index: true },
    preferences: {
      selectedChannelId: { type: String },
      selectedChannelName: { type: String },
      selectedChannelAvatar: { type: String },
      channels: [{
        channelId: { type: String, required: true },
        channelName: { type: String },
        channelAvatar: { type: String },
        addedAt: { type: Date, default: Date.now },
      }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
