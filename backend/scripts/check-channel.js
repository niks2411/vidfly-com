require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vidflyy';

async function checkChannel(email) {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected\n');

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log(`❌ No user found with email: ${email}`);
      process.exit(1);
    }

    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Name: ${user.name}`);
    console.log(`✅ Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);
    
    if (user.preferences && user.preferences.selectedChannelId) {
      console.log(`\n📺 Selected Channel:`);
      console.log(`   Channel ID: ${user.preferences.selectedChannelId}`);
      console.log(`   Channel Name: ${user.preferences.selectedChannelName || 'N/A'}`);
    } else {
      console.log(`\n❌ No channel selected for this email`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node scripts/check-channel.js <email>');
  console.log('Example: node scripts/check-channel.js user@example.com');
  process.exit(1);
}

checkChannel(email);

