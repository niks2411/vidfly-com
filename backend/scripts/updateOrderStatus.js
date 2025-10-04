const mongoose = require('mongoose');
const Order = require('../models/Order');
require('dotenv').config();

async function updateOrderStatus() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vidflyy';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Status mapping from old to new format
    const statusMapping = {
      'Pending': 'pending',
      'Payment Pending': 'payment_pending',
      'Paid': 'paid',
      'Promotion Scheduled': 'promotion_scheduled',
      'In Progress': 'in_progress',
      'Completed': 'completed',
      'Failed': 'failed'
    };

    // Update all orders with old status format
    for (const [oldStatus, newStatus] of Object.entries(statusMapping)) {
      const result = await Order.updateMany(
        { status: oldStatus },
        { $set: { status: newStatus } }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`Updated ${result.modifiedCount} orders from '${oldStatus}' to '${newStatus}'`);
      }
    }

    console.log('Order status update completed successfully!');

  } catch (error) {
    console.error('Error updating order status:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

updateOrderStatus();
