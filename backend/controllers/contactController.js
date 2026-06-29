'use strict';
const { transporter } = require('../config/mailConfig');

const escapeHtml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }
    if (message.length > 2000) {
      return res.status(400).json({ success: false, message: 'Message too long (max 2000 chars).' });
    }

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.ADMIN_EMAIL,
      subject: `[Portfolio] ${escapeHtml(subject)}`,
      html: `
        <h2 style="font-family:sans-serif;color:#1a1a1a">New Contact Form Submission</h2>
        <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
          <tr><td style="padding:6px 12px 6px 0;font-weight:600">Name:</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;font-weight:600">Email:</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;font-weight:600">Subject:</td><td>${escapeHtml(subject)}</td></tr>
        </table>
        <h3 style="font-family:sans-serif;margin-top:16px">Message</h3>
        <p style="font-family:sans-serif;font-size:14px;color:#333;white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};

module.exports = { sendContactEmail };
