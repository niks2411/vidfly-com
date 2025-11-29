const Joi = require('joi');
const User = require('../models/User');
const FreeViews = require('../models/FreeViews');
const Referral = require('../models/Referral');
const Order = require('../models/Order');

const REFERRAL_REWARD_VIEWS = 500; // Views given to both referrer and referred user

// Generate or get referral code for a user
const generateReferralCode = (email) => {
  const hash = email.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return `VID${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
};

// Get free views balance and referral stats
exports.getBalance = async (req, res, next) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.json({
        balance: 0,
        totalReferrals: 0,
        totalViewsEarned: 0,
        referralCode: generateReferralCode(normalizedEmail),
      });
    }

    // Get or create FreeViews record
    let freeViews = await FreeViews.findOne({ userId: user._id });
    
    if (!freeViews) {
      const referralCode = generateReferralCode(normalizedEmail);
      freeViews = await FreeViews.create({
        userId: user._id,
        balance: 0,
        referralCode,
      });
      
      // Update user with referral code
      user.referralCode = referralCode;
      await user.save();
    }

    // Get referral stats
    const referrals = await Referral.find({ referrerId: user._id });
    const totalReferrals = referrals.length;
    const totalViewsEarned = referrals.reduce((sum, ref) => sum + ref.referrerViewsAwarded, 0);

    return res.json({
      balance: freeViews.balance,
      totalReferrals,
      totalViewsEarned,
      referralCode: freeViews.referralCode || generateReferralCode(normalizedEmail),
    });
  } catch (err) {
    return next(err);
  }
};

// Apply referral code
exports.applyReferralCode = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      referralCode: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, referralCode } = value;
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedCode = referralCode.trim().toUpperCase();

    // Find the user applying the code
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please verify your email first.' });
    }

    // Find the referrer by referral code first
    const referrerFreeViews = await FreeViews.findOne({ referralCode: normalizedCode });
    if (!referrerFreeViews) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }

    const referrer = await User.findById(referrerFreeViews.userId);
    if (!referrer) {
      return res.status(404).json({ message: 'Referrer not found' });
    }

    // Prevent self-referral
    if (referrer._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: 'You cannot use your own referral code' });
    }

    // Check if referral already exists
    const existingReferral = await Referral.findOne({
      referrerId: referrer._id,
      referredId: user._id,
    });

    if (existingReferral) {
      return res.status(400).json({ message: 'Referral code already applied' });
    }

    // Check if user has already received free views (one-time only per email)
    // Free views can only be given once per email address on first verification
    let freeViews = await FreeViews.findOne({ userId: user._id });
    if (freeViews) {
      // If they've already received free views (totalEarned > 0 or applied referral before), reject
      if (freeViews.totalEarned > 0 || freeViews.referralApplied) {
        return res.status(400).json({ message: 'You have already received free views. Free views can only be received once per email address on first verification.' });
      }
      // If FreeViews exists but they haven't received free views yet (empty record, possibly from getBalance),
      // update it to give them free views (this is their first time)
      const userReferralCode = generateReferralCode(normalizedEmail);
      freeViews.balance = REFERRAL_REWARD_VIEWS;
      freeViews.totalEarned = REFERRAL_REWARD_VIEWS;
      freeViews.referralApplied = true;
      freeViews.referredBy = referrer._id;
      freeViews.referralCode = userReferralCode;
      await freeViews.save();
      
      // Update user with referral code
      user.referralCode = userReferralCode;
      await user.save();
    } else {
      // Create FreeViews for the referred user (first time receiving free views)
      // This is a one-time reward for first verification
      const userReferralCode = generateReferralCode(normalizedEmail);
      freeViews = await FreeViews.create({
        userId: user._id,
        balance: REFERRAL_REWARD_VIEWS, // Give views immediately on first verification
        totalEarned: REFERRAL_REWARD_VIEWS,
        referralCode: userReferralCode,
        referredBy: referrer._id,
        referralApplied: true,
      });
      
      // Update user with referral code
      user.referralCode = userReferralCode;
      await user.save();
    }

    // Create referral record
    await Referral.create({
      referrerId: referrer._id,
      referredId: user._id,
      referralCode: normalizedCode,
      referrerEmail: referrer.email,
      referredEmail: normalizedEmail,
      referrerViewsAwarded: 0, // Will be awarded when referred user creates first campaign
      referredViewsAwarded: REFERRAL_REWARD_VIEWS,
      status: 'code_applied',
    });

    return res.json({
      message: 'Referral code applied successfully!',
      viewsEarned: REFERRAL_REWARD_VIEWS,
      newBalance: freeViews.balance,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Referral code already applied' });
    }
    return next(err);
  }
};

// Award referrer when referred user creates first campaign
exports.awardReferrerOnFirstCampaign = async (referredUserId, orderId) => {
  try {
    const referral = await Referral.findOne({
      referredId: referredUserId,
      status: { $in: ['code_applied', 'pending'] },
    });

    if (!referral) {
      return; // No referral to process
    }

    // Check if referrer was already awarded (prevent double awarding)
    if (referral.referrerViewsAwarded > 0) {
      return; // Already awarded
    }

    // Check if this is the referred user's first campaign (any status)
    const userOrders = await Order.find({
      userId: referredUserId,
    });

    if (userOrders.length === 1) {
      // This is their first campaign - award the referrer immediately
      let referrerFreeViews = await FreeViews.findOne({ userId: referral.referrerId });
      
      if (!referrerFreeViews) {
        // Create FreeViews record for referrer if doesn't exist
        const referrer = await User.findById(referral.referrerId);
        if (referrer) {
          const referralCode = generateReferralCode(referrer.email);
          referrerFreeViews = await FreeViews.create({
            userId: referral.referrerId,
            balance: REFERRAL_REWARD_VIEWS,
            totalEarned: REFERRAL_REWARD_VIEWS,
            referralCode,
          });
          referrer.referralCode = referralCode;
          await referrer.save();
        }
      } else {
        // Award views to existing FreeViews record
        referrerFreeViews.balance += REFERRAL_REWARD_VIEWS;
        referrerFreeViews.totalEarned += REFERRAL_REWARD_VIEWS;
        await referrerFreeViews.save();
      }

      // Update referral record
      referral.referrerViewsAwarded = REFERRAL_REWARD_VIEWS;
      referral.status = 'campaign_created';
      referral.referredUserFirstCampaignId = orderId;
      await referral.save();
    }
  } catch (err) {
    console.error('Error awarding referrer:', err);
    // Don't throw - this shouldn't block order creation
  }
};

// Add free views (for other sources like mobile verification, first campaign, etc.)
exports.addFreeViews = async (userId, views, source = 'manual') => {
  try {
    let freeViews = await FreeViews.findOne({ userId });
    
    if (!freeViews) {
      const user = await User.findById(userId);
      if (!user) return;
      
      const referralCode = generateReferralCode(user.email);
      freeViews = await FreeViews.create({
        userId,
        balance: views,
        totalEarned: views,
        referralCode,
      });
      
      user.referralCode = referralCode;
      await user.save();
    } else {
      freeViews.balance += views;
      freeViews.totalEarned += views;
      await freeViews.save();
    }
    
    return freeViews;
  } catch (err) {
    console.error('Error adding free views:', err);
    throw err;
  }
};

// Redeem free views (deduct from balance)
exports.redeemFreeViews = async (userId, views) => {
  try {
    const freeViews = await FreeViews.findOne({ userId });
    
    if (!freeViews || freeViews.balance < views) {
      throw new Error('Insufficient free views balance');
    }
    
    freeViews.balance -= views;
    freeViews.totalRedeemed += views;
    await freeViews.save();
    
    return freeViews;
  } catch (err) {
    console.error('Error redeeming free views:', err);
    throw err;
  }
};


