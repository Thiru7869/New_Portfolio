'use strict';
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name:    { type: String, trim: true, maxlength: 100, default: 'Anonymous' },
    email:   { type: String, trim: true, lowercase: true, default: null, select: false },
    rating:  { type: Number, required: true, min: 1, max: 10 },
    message: { type: String, trim: true, maxlength: 500, default: '' },
    ip:      { type: String, default: null, select: false },
  },
  { timestamps: true }
);

reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);