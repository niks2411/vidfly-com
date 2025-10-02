const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    selectedPackage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', LeadSchema);


