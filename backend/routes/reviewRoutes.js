'use strict';
const express = require('express');
const router = express.Router();
const { getReviews, submitReview } = require('../controllers/reviewController');
const { reviewLimiter } = require('../middleware/rateLimiter');

router.get('/', getReviews);
router.post('/', reviewLimiter, submitReview);

module.exports = router;
