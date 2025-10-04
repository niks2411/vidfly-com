const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminUser', AdminUserSchema);


