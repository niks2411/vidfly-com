
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('./backend/models/Order');

dotenv.config();

async function analyzeRevenue() {
    try {
        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected.\n');

        const orders = await Order.find({ status: { $in: ['paid', 'completed', 'in_progress'] } });

        console.log('📊 --- REVENUE ANALYSIS ---');
        console.log(`Total Successful Orders: ${orders.length}`);

        let totalRevenue = 0;
        let totalViewsRequested = 0;
        let totalViewsGenerated = 0;

        orders.forEach(order => {
            const price = order.plan?.price || order.budget || 0;
            totalRevenue += price;

            if (order.plan?.quantity) {
                totalViewsRequested += order.plan.quantity;
            } else if (order.budget) {
                totalViewsRequested += order.budget / 0.2;
            }

            totalViewsGenerated += (order.viewsGenerated || 0);
        });

        console.log(`Total Revenue: ₹${totalRevenue.toLocaleString()}`);
        console.log(`Total Views Requested: ${totalViewsRequested.toLocaleString()}`);
        console.log(`Total Views Delivered: ${totalViewsGenerated.toLocaleString()}`);
        console.log('---------------------------\n');

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

analyzeRevenue();
