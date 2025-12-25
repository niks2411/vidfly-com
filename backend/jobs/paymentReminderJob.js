const cron = require('node-cron');
const Order = require('../models/Order');
const { sendPaymentReminderEmail } = require('../utils/emailService');

async function checkAndSendPaymentReminders() {
  try {
    const now = Date.now();
    const twentyFourHoursMs = 24 * 60 * 60 * 1000;
    const seventyTwoHoursMs = 72 * 60 * 60 * 1000;

    // Find all payment_pending orders; we'll filter in JS for precise timing + reminderCount
    const pendingOrders = await Order.find({
      status: 'payment_pending',
    })
      .populate('userId', 'email name')
      .populate('paymentId');

    console.log(`Found ${pendingOrders.length} payment_pending orders to evaluate for reminders`);

    for (const order of pendingOrders) {
      if (!order.userId?.email) continue;

      const createdAtMs = order.createdAt ? order.createdAt.getTime() : 0;
      const ageMs = now - createdAtMs;
      const reminderCount = order.reminderCount || 0;
      const lastReminderMs = order.lastReminderAt ? order.lastReminderAt.getTime() : 0;

      // 1st reminder: after 24h
      if (reminderCount === 0 && ageMs >= twentyFourHoursMs && ageMs < seventyTwoHoursMs) {
        try {
          await sendPaymentReminderEmail(order.userId.email, order);
          order.reminderCount = 1;
          order.lastReminderAt = new Date(now);
          await order.save();
          console.log(
            `Sent 1st payment reminder for order ${order.orderId} to ${order.userId.email}`
          );
        } catch (emailError) {
          console.error(
            `Failed to send 1st reminder email for order ${order.orderId}:`,
            emailError
          );
        }
        continue;
      }

      // 2nd reminder: after 72h (and at least 48h after first reminder)
      if (
        reminderCount === 1 &&
        ageMs >= seventyTwoHoursMs &&
        lastReminderMs &&
        now - lastReminderMs >= 48 * 60 * 60 * 1000
      ) {
        try {
          await sendPaymentReminderEmail(order.userId.email, order);
          order.reminderCount = 2;
          order.lastReminderAt = new Date(now);
          await order.save();
          console.log(
            `Sent 2nd payment reminder for order ${order.orderId} to ${order.userId.email}`
          );
        } catch (emailError) {
          console.error(
            `Failed to send 2nd reminder email for order ${order.orderId}:`,
            emailError
          );
        }
        continue;
      }

      // If reminderCount >= 2, do nothing (no more reminders for this order)
    }
  } catch (error) {
    console.error('Error in payment reminder job:', error);
  }
}

// Schedule job to run every hour
// Format: minute hour day month day-of-week
// '0 * * * *' means: at minute 0 of every hour
function startPaymentReminderJob() {
  console.log('Starting payment reminder cron job (runs every hour)');
  
  cron.schedule('0 * * * *', async () => {
    console.log('Running payment reminder job...');
    await checkAndSendPaymentReminders();
  });
  
  // Also run immediately on startup to catch any missed reminders
  setTimeout(() => {
    console.log('Running initial payment reminder check...');
    checkAndSendPaymentReminders();
  }, 5000); // Wait 5 seconds after server starts
}

module.exports = {
  startPaymentReminderJob,
  checkAndSendPaymentReminders
};

