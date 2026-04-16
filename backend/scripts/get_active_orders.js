require('dotenv').config({ path: require('path').join(__dirname, '../.env.development') });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const orders = await mongoose.connection.db.collection('orders').find({
    status: { $nin: ['payment_pending', 'failed'] }
  }).sort({ createdAt: -1 }).toArray();

  console.log(`\nFound ${orders.length} active orders:\n`);
  orders.forEach((o, i) => {
    console.log(`${i + 1}. ${o.orderId} | Status: ${o.status} | Budget: ₹${o.budget || o.plan?.price || 'N/A'} | Created: ${new Date(o.createdAt).toLocaleDateString()}`);
  });
  console.log('');
  await mongoose.disconnect();
}
main().catch(console.error);
