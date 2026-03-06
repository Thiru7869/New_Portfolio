const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// verify smtp connection
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email server ready");
  } catch (error) {
    console.error("❌ Email server failed");
    console.error(error);
  }
};

module.exports = transporter;
module.exports.verifyConnection = verifyConnection;