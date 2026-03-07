const nodemailer = require("nodemailer");
const dns = require("dns");

// Force Node.js to prefer IPv4 (fixes Render IPv6 issue)
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4, // Force IPv4
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000
});

const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email server ready");
  } catch (error) {
    console.error("❌ Email server failed");
    console.error(error.message);
  }
};

module.exports = { transporter, verifyConnection };