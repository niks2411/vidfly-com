const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/AdminUser');
require('dotenv').config();

async function updateAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vidflyy';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const username = 'vidflyyadmin';
    const password = 'Admin@121004';
    const passwordHash = await bcrypt.hash(password, 10);

    // Delete existing admin user if any with username 'admin' or matching the requested username
    await AdminUser.deleteMany({ username: { $in: ['admin', 'vidflyyadmin'] } });

    // Create the new admin user
    const admin = await AdminUser.create({
      username,
      passwordHash,
      name: 'Vidflyy Admin',
      role: 'admin'
    });

    console.log('Admin user updated/created successfully:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(0);
  }
}

updateAdmin();
