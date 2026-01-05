const Joi = require('joi');

// Pricing calculation logic
// Base rate: ₹0.2 per view (fixed rate)
// Views split: 94% base + 6% bonus
function calculateViewsFromPrice(price) {
  // Base calculation: ₹0.2 per view
  const baseRatePerView = 0.2;

  // Use fixed rate of 0.2rs per view
  let ratePerView = baseRatePerView;

  // Calculate total views from price
  const totalViews = Math.floor(price / ratePerView);

  // Split into base (94%) and bonus (6%)
  const basePercentage = 0.94;
  const bonusPercentage = 0.06;

  const baseViews = Math.floor(totalViews * basePercentage);
  const bonusViews = Math.floor(totalViews * bonusPercentage);

  // Estimated views range (±10% variance)
  const variance = 0.10;
  const minViews = Math.floor(totalViews * (1 - variance));
  const maxViews = Math.floor(totalViews * (1 + variance));

  const minBaseViews = Math.floor(baseViews * (1 - variance));
  const maxBaseViews = Math.floor(baseViews * (1 + variance));

  const minBonusViews = Math.floor(bonusViews * (1 - variance));
  const maxBonusViews = Math.floor(bonusViews * (1 + variance));

  // Subscribers estimation (roughly 3-5% of views convert to subscribers)
  const subscriberRateMin = 0.03;
  const subscriberRateMax = 0.05;
  const minSubscribers = Math.floor(totalViews * subscriberRateMin);
  const maxSubscribers = Math.floor(totalViews * subscriberRateMax);

  return {
    price: price,
    baseViews: {
      min: minBaseViews,
      max: maxBaseViews,
      exact: baseViews
    },
    bonusViews: {
      min: minBonusViews,
      max: maxBonusViews,
      exact: bonusViews,
      percentage: bonusPercentage * 100
    },
    totalViews: {
      min: minViews,
      max: maxViews,
      exact: totalViews
    },
    subscribers: {
      min: minSubscribers,
      max: maxSubscribers
    },
    ratePerView: ratePerView.toFixed(3)
  };
}

exports.calculateViews = async (req, res, next) => {
  try {
    const schema = Joi.object({
      price: Joi.number().min(800).max(10000).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message || 'Invalid price. Price must be between ₹800 and ₹10,000.'
      });
    }

    const result = calculateViewsFromPrice(value.price);

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

// Get pricing tiers for reference
exports.getPricingTiers = async (req, res, next) => {
  try {
    const tiers = [
      { min: 10, max: 10000, rate: 0.2, name: 'Standard' }
    ];

    return res.json({ tiers });
  } catch (err) {
    return next(err);
  }
};


