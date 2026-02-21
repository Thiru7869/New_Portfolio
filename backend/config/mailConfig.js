'use strict';

const nodemailer = require('nodemailer');

/**
 * Creates and returns a configured Nodemailer transporter
 * using Gmail SMTP with App Password authentication.
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Verify that the SMTP connection works on startup.
 */
async function verifyConnection() {
  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified — emails will send correctly.');
  } catch (err) {
    console.warn('⚠️  SMTP verification failed:', err.message);
    console.warn('   Check EMAIL_USER and EMAIL_PASS in your .env file.');
  }
}

module.exports = { createTransporter, verifyConnection };
