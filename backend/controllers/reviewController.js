'use strict';

const validator = require('validator');
const { createTransporter } = require('../config/mailConfig');

/**
 * Builds the HTML email body for a new portfolio review.
 */
function buildEmailHTML({ name, email, rating, message, timestamp, ip }) {
  const stars      = '★'.repeat(Math.min(Math.max(Math.round(rating / 2), 1), 5));
  const emptyStars = '☆'.repeat(5 - Math.min(Math.max(Math.round(rating / 2), 1), 5));
  const ratingColor = rating >= 8 ? '#22c55e' : rating >= 5 ? '#f59e0b' : '#ef4444';
  const ratingLabel = rating >= 8 ? 'Excellent' : rating >= 5 ? 'Good' : 'Needs Improvement';
  const formattedDate = new Date(timestamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Review</title>
</head>
<body style="margin:0;padding:0;background:#0a1120;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1120;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#060b14 0%,#0f172b 100%);border-radius:16px 16px 0 0;padding:36px 40px;border-bottom:2px solid #4f8ef7;text-align:center;">
              <div style="font-size:11px;letter-spacing:3px;color:#4f8ef7;text-transform:uppercase;margin-bottom:12px;font-weight:700;">
                📬 Portfolio Notification
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#edf2ff;letter-spacing:-0.5px;">
                New Review Received
              </h1>
              <p style="margin:10px 0 0;color:#94a3b8;font-size:14px;">
                Someone just rated your portfolio on <a href="https://thiru7869.github.io" style="color:#4f8ef7;text-decoration:none;">thiru7869.github.io</a>
              </p>
            </td>
          </tr>

          <!-- Rating Highlight -->
          <tr>
            <td style="background:#111827;padding:32px 40px;text-align:center;border-left:1px solid #1c2d47;border-right:1px solid #1c2d47;">
              <div style="display:inline-block;background:#0a1120;border:1px solid #1c2d47;border-radius:12px;padding:24px 40px;">
                <div style="font-size:56px;font-weight:900;color:${ratingColor};line-height:1;font-family:monospace;">${rating}<span style="font-size:28px;color:#475569;">/10</span></div>
                <div style="margin-top:8px;font-size:20px;letter-spacing:2px;">${stars}<span style="color:#1c2d47;">${emptyStars}</span></div>
                <div style="margin-top:8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ratingColor};">${ratingLabel}</div>
              </div>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="background:#111827;padding:0 40px 32px;border-left:1px solid #1c2d47;border-right:1px solid #1c2d47;">

              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#0f172b;border:1px solid #1c2d47;border-radius:10px;padding:18px 20px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:6px;">👤 Reviewer Name</div>
                    <div style="font-size:17px;font-weight:600;color:#edf2ff;">${validator.escape(String(name))}</div>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#0f172b;border:1px solid #1c2d47;border-radius:10px;padding:18px 20px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:6px;">📧 Email Address</div>
                    <div style="font-size:16px;color:#4f8ef7;">
                      ${email ? `<a href="mailto:${validator.escape(email)}" style="color:#4f8ef7;text-decoration:none;">${validator.escape(email)}</a>` : '<span style="color:#475569;font-style:italic;">Not provided</span>'}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#0f172b;border:1px solid #1c2d47;border-left:3px solid #4f8ef7;border-radius:10px;padding:18px 20px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:10px;">💬 Review Message</div>
                    <div style="font-size:15px;color:#94a3b8;line-height:1.75;white-space:pre-line;">${validator.escape(String(message))}</div>
                  </td>
                </tr>
              </table>

              <!-- Meta -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="background:#0f172b;border:1px solid #1c2d47;border-radius:10px;padding:14px 16px;vertical-align:top;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:5px;">🕐 Date & Time (IST)</div>
                    <div style="font-size:13px;color:#94a3b8;">${formattedDate}</div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background:#0f172b;border:1px solid #1c2d47;border-radius:10px;padding:14px 16px;vertical-align:top;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#475569;margin-bottom:5px;">🌐 IP Address</div>
                    <div style="font-size:13px;color:#94a3b8;">${ip || 'Not captured'}</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a1120;border:1px solid #1c2d47;border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 10px;font-size:13px;color:#475569;">
                This email was sent automatically when a user submitted a review on your portfolio.
              </p>
              <a href="https://thiru7869.github.io/#rating" style="display:inline-block;background:#4f8ef7;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 24px;border-radius:8px;">
                View All Reviews →
              </a>
              <p style="margin:16px 0 0;font-size:11px;color:#1c2d47;">Thirumala Narasimha Poluru — Portfolio Backend v1.0</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * POST /api/review
 * Validates incoming review data and sends email notification to reddytn4@gmail.com
 */
async function submitReview(req, res) {
  try {
    const { name, email, rating, message } = req.body;

    // ── Input validation ──────────────────────────────────────
    const errors = [];
    if (!name || typeof name !== 'string' || name.trim().length < 2)
      errors.push('Name must be at least 2 characters.');
    if (!message || typeof message !== 'string' || message.trim().length < 5)
      errors.push('Review message must be at least 5 characters.');
    if (message && message.trim().length > 500)
      errors.push('Review message must not exceed 500 characters.');
    if (!rating || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 10)
      errors.push('Rating must be a number between 1 and 10.');
    if (email && email.trim() !== '' && !validator.isEmail(email.trim()))
      errors.push('If provided, email must be a valid email address.');

    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    // ── Sanitize ──────────────────────────────────────────────
    const cleanName    = validator.escape(name.trim()).substring(0, 80);
    const cleanEmail   = email && email.trim() ? email.trim().toLowerCase() : null;
    const cleanRating  = Number(rating);
    const cleanMessage = validator.escape(message.trim()).substring(0, 500);
    const timestamp    = Date.now();
    const ip           = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
                      || req.headers['x-real-ip']
                      || req.socket?.remoteAddress
                      || 'Unknown';

    // ── Build & Send Email ────────────────────────────────────
    const transporter = createTransporter();
    const mailOptions = {
      from: `"Portfolio Bot 🤖" <${process.env.EMAIL_USER}>`,
      to: 'reddytn4@gmail.com', // ← Mail notifications go here
      subject: `⭐ New Portfolio Review — ${cleanRating}/10 from ${cleanName}`,
      html: buildEmailHTML({
        name: cleanName, email: cleanEmail,
        rating: cleanRating, message: cleanMessage,
        timestamp, ip,
      }),
      text: [
        `New Portfolio Review`,
        `═══════════════════`,
        `Rating:  ${cleanRating}/10`,
        `Name:    ${cleanName}`,
        `Email:   ${cleanEmail || 'Not provided'}`,
        `Message: ${cleanMessage}`,
        `Date:    ${new Date(timestamp).toISOString()}`,
        `IP:      ${ip}`,
      ].join('\n'),
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Review email sent to reddytn4@gmail.com — Rating: ${cleanRating}/10, From: ${cleanName}`);

    return res.status(200).json({
      success: true,
      message: 'Review submitted and notification sent successfully.',
    });

  } catch (err) {
    console.error('❌ Review submission error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while sending notification. Your review was saved locally.',
    });
  }
}

module.exports = { submitReview };
