const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema(
  {
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    referredId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    referralCode: { type: String, required: true, index: true },
    referrerEmail: { type: String, required: true, lowercase: true },
    referredEmail: { type: String, required: true, lowercase: true },
    referrerViewsAwarded: { type: Number, default: 0 }, // Views given to referrer
    referredViewsAwarded: { type: Number, default: 0 }, // Views given to referred user
    status: {
      type: String,
      enum: ['pending', 'code_applied', 'campaign_created', 'completed'],
      default: 'pending',
      index: true,
    },
    referredUserFirstCampaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  },
  { timestamps: true }
);

// Index for faster lookups
ReferralSchema.index({ referrerId: 1, status: 1 });

module.exports = mongoose.model('Referral', ReferralSchema);





