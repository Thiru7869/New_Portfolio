const nodemailer = require("nodemailer");
const dns = require("dns");

// force Node to prefer IPv4
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4, // force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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
