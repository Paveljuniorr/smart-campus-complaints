
const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  imageUrl: { type: String },
  email: { type: String, required: true },
  adminNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Complaint', complaintSchema);
