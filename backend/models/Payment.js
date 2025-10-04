const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    gateway: { type: String, enum: ['razorpay', 'stripe'], required: true },
    paymentOrderId: { type: String },
    paymentId: { type: String },
    signature: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'created', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'pending'
    },
    gatewayResponse: { type: mongoose.Schema.Types.Mixed },
    failureReason: { type: String },
    refundAmount: { type: Number, default: 0 },
    refundedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
