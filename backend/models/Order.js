const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
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
      enum: ['pending', 'payment_pending', 'paid', 'promotion_scheduled', 'in_progress', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
    notes: { type: String },
    adminComments: { type: String },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);


