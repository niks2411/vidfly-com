const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../backend/.env.development') });

const Order = require('../backend/models/Order');
const User = require('../backend/models/User');
const Payment = require('../backend/models/Payment');

async function getOrder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const order = await Order.findOne({ orderId: 'VIDMNFP6KD06C08C18D9E486662' })
      .populate('userId')
      .populate('paymentId');
    console.log(JSON.stringify(order, null, 2));
  } catch(e) {
    console.error(e);
  } finally {
    process.exit();
  }
}
getOrder();
