const mongoose = require('mongoose');

const FreeViewsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    balance: { type: Number, default: 0, min: 0 },
    totalEarned: { type: Number, default: 0 }, // Total views ever earned
    totalRedeemed: { type: Number, default: 0 }, // Total views ever used
    referralCode: { type: String, unique: true, index: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who referred this user
    referralApplied: { type: Boolean, default: false }, // Whether referral code was applied
  },
  { timestamps: true }
);

// Generate referral code from email
FreeViewsSchema.statics.generateReferralCode = function(email) {
  const hash = email.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return `VID${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
};

module.exports = mongoose.model('FreeViews', FreeViewsSchema);





