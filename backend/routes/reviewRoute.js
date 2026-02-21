'use strict';

const express    = require('express');
const rateLimit  = require('express-rate-limit');
const { submitReview } = require('../controllers/reviewController');

const router = express.Router();

// Rate limiter: max 5 review submissions per IP per hour
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many reviews submitted from this IP. Please try again after 1 hour.',
  },
});

// POST /api/review
router.post('/', reviewLimiter, submitReview);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', route: '/api/review', timestamp: new Date().toISOString() });
});

module.exports = router;
