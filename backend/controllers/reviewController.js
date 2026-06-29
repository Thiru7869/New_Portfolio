'use strict';
const { transporter } = require('../config/mailConfig');
const Review = require('../models/Review');

const escapeHtml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const getReviews = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-email -ip');

    const mapped = reviews.map(r => ({
      name: r.name,
      rating: r.rating,
      message: r.message,
      createdAt: r.createdAt,
    }));

    res.json({ success: true, data: { reviews: mapped, total: mapped.length } });
  } catch (err) {
    console.error('getReviews error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};

const submitReview = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ success: false, message: 'Rating and message are required.' });
    }
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      return res.status(400).json({ success: false, message: 'Rating must be 1–10.' });
    }
    if (message.length > 500) {
      return res.status(400).json({ success: false, message: 'Message too long (max 500 chars).' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress;
    const review = await new Review({
      name: name || 'Anonymous',
      email: email || null,
      rating: ratingNum,
      message,
      ip,
    }).save();

    const emailPromises = [];

    if (email) {
      emailPromises.push(
        transporter.sendMail({
          from: `"Thirumala Portfolio" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Thank you for your review!',
          html: `
            <div style="font-family:sans-serif;max-width:480px;color:#1a1a1a">
              <h2>Thank you, ${escapeHtml(name || 'there')}!</h2>
              <p>Your review has been received.</p>
              <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:16px 0">
                <p><strong>Rating:</strong> ${ratingNum}/10</p>
                <p><strong>Review:</strong> ${escapeHtml(message)}</p>
              </div>
              <p style="color:#555;font-size:13px">— Thirumala Narasimha Poluru</p>
            </div>
          `,
        }).catch(err => console.warn('User confirmation email failed:', err.message))
      );
    }

    emailPromises.push(
      transporter.sendMail({
        from: `"Portfolio System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Portfolio Review — ${ratingNum}/10`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;color:#1a1a1a">
            <h2>New Review Received</h2>
            <table style="font-size:14px;border-collapse:collapse">
              <tr><td style="padding:4px 12px 4px 0;font-weight:600">Name:</td><td>${escapeHtml(name || 'Anonymous')}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:600">Email:</td><td>${email ? escapeHtml(email) : 'Not provided'}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;font-weight:600">Rating:</td><td>${ratingNum}/10</td></tr>
            </table>
            <h3 style="margin-top:12px">Review</h3>
            <p style="font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
        `,
      }).catch(err => console.warn('Admin notification email failed:', err.message))
    );

    await Promise.all(emailPromises);

    res.json({
      success: true,
      message: 'Review submitted successfully.',
      data: { id: review._id },
    });
  } catch (err) {
    console.error('submitReview error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to submit review.' });
  }
};

module.exports = { getReviews, submitReview };
