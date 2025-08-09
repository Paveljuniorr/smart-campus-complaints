
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { sendStatusEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');

// middleware to protect admin routes
function authMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Submit a new complaint (open to students)
router.post('/', async (req, res) => {
  const c = new Complaint(req.body);
  await c.save();
  res.json({ message: 'Complaint submitted', complaint: c });
});

// Get all complaints (admin) or filter by email (student)
router.get('/', async (req, res) => {
  const { email } = req.query;
  const query = email ? { email } : {};
  const items = await Complaint.find(query).sort({ createdAt: -1 });
  res.json(items);
});

// Update complaint (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (req.body.status && updated.email) {
    // send email (may fail if SMTP not configured)
    try { await sendStatusEmail(updated.email, updated); } catch (e) { console.error('Email error', e.message); }
  }
  res.json(updated);
});

// Simple analytics
router.get('/stats/summary', authMiddleware, async (req, res) => {
  const total = await Complaint.countDocuments();
  const pending = await Complaint.countDocuments({ status: 'Pending' });
  const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
  const resolved = await Complaint.countDocuments({ status: 'Resolved' });
  const byCategory = await Complaint.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json({ total, pending, inProgress, resolved, byCategory });
});

module.exports = router;
