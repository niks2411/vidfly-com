const Joi = require('joi');
const User = require('../models/User');
const FreeViews = require('../models/FreeViews');
const Referral = require('../models/Referral');

const REFERRAL_REWARD_VIEWS = 500; // Views given to referrer when someone uses their code

// Generate referral code from email
const generateReferralCode = (email) => {
  const hash = email.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return `VID${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
};

// Helper: ensure a FreeViews record exists for a user
const ensureFreeViewsRecord = async (user, initialBalance = 0) => {
  let freeViews = await FreeViews.findOne({ userId: user._id });
  if (!freeViews) {
    const referralCode = generateReferralCode(user.email);
    freeViews = await FreeViews.create({
      userId: user._id,
      balance: initialBalance,
      totalEarned: initialBalance,
      referralCode,
    });
    user.referralCode = referralCode;
    await user.save();
  }
  return freeViews;
};

// Get free views balance and referral stats
exports.getBalance = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.json({
        balance: 0,
        totalReferrals: 0,
        totalViewsEarned: 0,
        totalRedeemed: 0,
        referralCode: generateReferralCode(normalizedEmail),
      });
    }

    const freeViews = await ensureFreeViewsRecord(user, 0);

    const referrals = await Referral.find({ referrerId: user._id });
    const totalReferrals = referrals.length;
    const totalViewsEarned = referrals.reduce((sum, ref) => sum + ref.referrerViewsAwarded, 0);

    return res.json({
      balance: freeViews.balance,
      totalReferrals,
      totalViewsEarned,
      totalRedeemed: freeViews.totalRedeemed || 0,
      referralCode: freeViews.referralCode || generateReferralCode(normalizedEmail),
    });
  } catch (err) {
    return next(err);
  }
};

// Apply referral code - When Person B verifies email with Person A's code
// Person A gets 500 views, Person B gets nothing
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

    // Find the user applying the code (Person B)
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please verify your email first.' });
    }

    // Prevent multiple referrals for the same user (only first counts)
    const anyExistingReferral = await Referral.findOne({ referredId: user._id });
    if (anyExistingReferral) {
      return res.status(400).json({ message: 'Referral already applied for this user' });
    }

    // Find the referrer (Person A) by referral code
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

    // Ensure FreeViews records exist
    const referrerRecord = await ensureFreeViewsRecord(referrer, 0);
    const userRecord = await ensureFreeViewsRecord(user, 0);

    // Mark referral on referred user (B) without awarding views
    userRecord.referredBy = referrer._id;
    userRecord.referralApplied = true;
    await userRecord.save();

    // DO NOT award views yet - views are awarded when referred user completes first campaign
    // referrerRecord.balance remains unchanged

    // Create referral record with pending status
    await Referral.create({
      referrerId: referrer._id,
      referredId: user._id,
      referralCode: normalizedCode,
      referrerEmail: referrer.email,
      referredEmail: normalizedEmail,
      referrerViewsAwarded: 0, // Views NOT awarded yet - pending first campaign completion
      referredViewsAwarded: 0, // Person B gets 0 views
      status: 'pending', // Waiting for referred user to complete first campaign
    });

    return res.json({
      message: 'Referral code applied successfully!',
      viewsEarned: 0, // Person B gets no views
      newBalance: userRecord.balance,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Referral code already applied' });
    }
    return next(err);
  }
};

// Redeem free views (deduct from balance when used in order)
exports.redeemFreeViews = async (userId, views) => {
  try {
    const freeViews = await FreeViews.findOne({ userId });

    if (!freeViews) {
      throw new Error('Free views record not found');
    }

    if (freeViews.balance < views) {
      throw new Error(`Insufficient free views balance. Available: ${freeViews.balance}, Requested: ${views}`);
    }

    // Deduct views from balance
    freeViews.balance -= views;
    freeViews.totalRedeemed = (freeViews.totalRedeemed || 0) + views;
    await freeViews.save();

    console.log(`Successfully redeemed ${views} free views for user ${userId}. Remaining balance: ${freeViews.balance}`);
    return freeViews;
  } catch (err) {
    console.error('Error redeeming free views:', err);
    throw err;
  }
};

// Add free views (for manual/admin purposes)
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

// Award referral reward when referred user completes their first campaign
// This is called from payment.controller.js on successful payment
exports.awardReferralRewardOnFirstCampaign = async (userId, orderId) => {
  try {
    // Find pending referral where this user was referred
    const referral = await Referral.findOne({
      referredId: userId,
      status: 'pending',
    });

    if (!referral) {
      console.log(`No pending referral found for user ${userId}`);
      return null;
    }

    // Check if reward was already given (safety check)
    if (referral.referrerViewsAwarded > 0) {
      console.log(`Referral reward already awarded for user ${userId}`);
      return null;
    }

    // Find referrer's FreeViews record
    const referrerFreeViews = await FreeViews.findOne({ userId: referral.referrerId });
    if (!referrerFreeViews) {
      console.error(`FreeViews record not found for referrer ${referral.referrerId}`);
      return null;
    }

    // Award referrer with 500 views
    referrerFreeViews.balance += REFERRAL_REWARD_VIEWS;
    referrerFreeViews.totalEarned += REFERRAL_REWARD_VIEWS;
    await referrerFreeViews.save();

    // Update referral record
    referral.referrerViewsAwarded = REFERRAL_REWARD_VIEWS;
    referral.status = 'completed';
    referral.referredUserFirstCampaignId = orderId;
    await referral.save();

    console.log(`✅ Referral reward of ${REFERRAL_REWARD_VIEWS} views awarded to referrer ${referral.referrerEmail} for successful campaign by ${referral.referredEmail}`);

    return {
      referrerEmail: referral.referrerEmail,
      viewsAwarded: REFERRAL_REWARD_VIEWS,
    };
  } catch (err) {
    console.error('Error awarding referral reward:', err);
    // Don't throw - we don't want to fail the payment if referral reward fails
    return null;
  }
};
