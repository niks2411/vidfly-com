const Joi = require('joi');

// Pricing calculation logic
// Base rate: ₹299 for 1000 views = ₹0.299 per view
// We'll use a tiered pricing system
function calculateViewsFromPrice(price) {
  // Base calculation: ₹0.299 per view (from starter package: ₹299 for 1000 views)
  const baseRatePerView = 0.299;
  
  // Tiered pricing (better rates for higher budgets)
  let ratePerView = baseRatePerView;
  
  if (price >= 1000) {
    ratePerView = 0.22; // Better rate for ₹1000+
  } else if (price >= 500) {
    ratePerView = 0.25; // Better rate for ₹500+
  } else if (price >= 200) {
    ratePerView = 0.27; // Better rate for ₹200+
  }
  
  // Calculate base views
  const baseViews = Math.floor(price / ratePerView);
  
  // Bonus views (30% bonus)
  const bonusPercentage = 0.30;
  const bonusViews = Math.floor(baseViews * bonusPercentage);
  
  // Total views
  const totalViews = baseViews + bonusViews;
  
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
      price: Joi.number().min(10).max(10000).required()
    });
    
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message || 'Invalid price. Price must be between ₹10 and ₹10,000.'
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
      { min: 10, max: 199, rate: 0.299, name: 'Starter' },
      { min: 200, max: 499, rate: 0.27, name: 'Popular' },
      { min: 500, max: 999, rate: 0.25, name: 'Viral' },
      { min: 1000, max: 10000, rate: 0.22, name: 'Premium' }
    ];
    
    return res.json({ tiers });
  } catch (err) {
    return next(err);
  }
};


