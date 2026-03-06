const transporter = require("../config/mailConfig");

const submitReview = async (req, res) => {
  try {

    const { name, email, rating, message } = req.body;

    // USER EMAIL
    const userMail = {
      from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for your review",
      html: `
      <h2>Greetings</h2>

      <p>Hello ${name},</p>

      <h3>Your Review</h3>
      <p><b>Rating:</b> ${rating}/10</p>

      <h3>Remarks</h3>
      <p>${message}</p>

      <h3>Our Services</h3>
      <ul>
        <li>Web Development</li>
        <li>Frontend Development</li>
        <li>API Development</li>
        <li>Database Design</li>
      </ul>

      <h3>Contact</h3>
      <p>Email: ${process.env.EMAIL_USER}</p>
      <p>Phone: +91 7416061190</p>

      <p><b>By Admin</b></p>
      `
    };

    // ADMIN EMAIL
    const adminMail = {
      from: `"Portfolio System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Portfolio Review Received",
      html: `
      <h2>New Review Received</h2>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>

      <p><b>Rating:</b> ${rating}/10</p>

      <h3>Remarks</h3>
      <p>${message}</p>
      `
    };

    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);

    res.json({ message: "Review submitted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
};

module.exports = { submitReview };