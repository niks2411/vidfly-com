const Joi = require('joi');
const Lead = require('../models/Lead');

const leadSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  selectedPackage: Joi.string().required(),
});

exports.createLead = async (req, res, next) => {
  try {
    const { error, value } = leadSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const lead = await Lead.create(value);
    return res.status(201).json(lead);
  } catch (err) { return next(err); }
};


