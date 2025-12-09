const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    phone: { type: String },
    emailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    referralCode: { type: String, unique: true, sparse: true, index: true },
    preferences: {
      selectedChannelId: { type: String },
      selectedChannelName: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
