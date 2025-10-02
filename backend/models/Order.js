const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    phone: { type: String },
    youtubeLink: { type: String },
    plan: {
      type: new mongoose.Schema(
        {
          name: String,
          type: { type: String, enum: ['views', 'subscribers', 'watch_time', 'likes'], required: true },
          quantity: Number,
          price: Number,
          currency: { type: String, default: 'INR' },
        },
        { _id: false }
      ),
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Payment Pending', 'Paid', 'Promotion Scheduled', 'In Progress', 'Completed', 'Failed'],
      default: 'Pending',
      index: true,
    },
    payment: {
      gateway: { type: String, enum: ['razorpay', 'stripe'] },
      paymentOrderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
      amount: { type: Number },
      currency: { type: String },
      status: { type: String, enum: ['created', 'authorized', 'captured', 'failed'] },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);


