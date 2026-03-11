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
          type: { type: String, enum: ['views', 'subscribers', 'watch_time', 'likes', 'package', 'bulk-views'], required: true },
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
    campaignType: {
      type: String,
      enum: ['promote_video', 'promote_channel', 'packages', 'bulk_views', 'free_views'],
    },
    source: { type: String },
    budget: { type: Number },
    channel: {
      type: new mongoose.Schema(
        {
          name: String,
          channelId: String,
          link: String,
          avatar: String,
        },
        { _id: false }
      ),
    },
    videos: [
      new mongoose.Schema(
        {
          videoId: String,
          title: String,
          link: String,
          thumbnail: String,
          viewsRequested: Number,
        },
        { _id: false }
      ),
    ],
    packageInfo: {
      type: new mongoose.Schema(
        {
          id: String,
          name: String,
          price: Number,
          currency: String,
          description: String,
        },
        { _id: false }
      ),
    },
    targeting: {
      type: new mongoose.Schema(
        {
          country: String,
          goal: String,
          duration: String,
          autoTargeting: { type: Boolean, default: true },
          notes: String,
          gender: String,
          ages: [String],
          interests: [String],
          keywords: [String],
        },
        { _id: false }
      ),
    },
    freeViewsRedeemed: { type: Number, default: 0 }, // Track how many free views were redeemed for this order
    // Reminder email tracking for payment_pending orders
    reminderCount: { type: Number, default: 0 }, // 0 = none, 1 = first (24h), 2 = second (72h)
    lastReminderAt: { type: Date },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);


