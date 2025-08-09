
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  role: { type: String, default: 'admin' }
});
module.exports = mongoose.model('User', userSchema);
