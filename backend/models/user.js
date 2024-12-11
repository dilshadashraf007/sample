// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
  location: String,
  workType: String, 
  workDate: Date, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




const User = mongoose.model('User', userSchema);
module.exports = User;
