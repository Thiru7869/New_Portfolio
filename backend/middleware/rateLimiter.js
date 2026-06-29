'use strict';
const rateLimit = require('express-rate-limit');

// Global limiter — applied to all routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// Strict limiter — applied only to POST /api/review
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many reviews submitted. Please wait an hour.' },
});

module.exports = { globalLimiter, reviewLimiter };