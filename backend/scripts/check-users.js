const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.development') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in .env.development");
    process.exit(1);
}

async function checkUsers() {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        
        const User = mongoose.model('User', new mongoose.Schema({
            email: String,
            googleId: String,
            createdAt: Date
        }));

        const totalUsers = await User.countDocuments({});
        const gmailUsers = await User.countDocuments({ email: /@gmail\.com$/i });
        const googleUsers = await User.countDocuments({ googleId: { $exists: true, $ne: null } });
        const otpUsers = await User.countDocuments({ googleId: { $exists: false } });
        
        console.log("\n📊 --- USER STATISTICS ---");
        console.log(`✅ Total Users: ${totalUsers}`);
        console.log(`📧 Gmail Users: ${gmailUsers}`);
        console.log(`🌐 Google Login: ${googleUsers}`);
        console.log(`🔑 OTP Login:    ${otpUsers}`);
        console.log("-------------------------\n");

        if (totalUsers > 0) {
            console.log("📋 ALL Registered Users:");
            const allUsers = await User.find({}, { email: 1, googleId: 1 }).sort({ createdAt: -1 });
            allUsers.forEach((u, index) => {
                const method = u.googleId ? "🌐 Google" : "🔑 OTP";
                console.log(`${(index + 1).toString().padStart(3)}. ${u.email.padEnd(35)} [${method}]`);
            });
        }

    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

checkUsers();
