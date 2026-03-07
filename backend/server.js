require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const { globalLimiter } = require("./middleware/rateLimiter");
const { transporter, verifyConnection } = require("./config/mailConfig");

const app = express();

// =============================
// MIDDLEWARE
// =============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================
// CORS CONFIG
// =============================
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  process.env.FRONTEND_URL
];

app.use(
  cors({
    origin: function (origin, callback) {

      console.log("🌐 Incoming origin:", origin);

      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.error("❌ CORS blocked:", origin);
        callback(new Error("CORS not allowed"));
      }

    },
    credentials: true,
  })
);

// =============================
// RATE LIMITER
// =============================
app.use(globalLimiter);

// =============================
// REQUEST LOGGER
// =============================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// =============================
// API ROUTES
// =============================
app.use("/api/review", reviewRoutes);

// =============================
// HEALTH CHECK
// =============================
app.get("/", (req, res) => {
  res.json({
    status: "Portfolio Backend Running",
    version: "2.0.0",
    endpoints: {
      reviews: "/api/review",
    },
  });
});

// =============================
// TEST EMAIL ENDPOINT
// =============================
app.get("/api/test-email", (req, res) => {

  console.log("📧 Test email requested");

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Test Email from Portfolio",
    text: "Hello! This is a test email from your portfolio backend.",
  })
    .then(() => {

      console.log("✅ Test email sent");

      res.send("✅ Test email sent successfully!");

    })
    .catch(err => {

      console.error("❌ Test email failed:", err.message);

      res.status(500).send("❌ Email failed");

    });

});

// =============================
// START SERVER
// =============================
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {

    await connectDB();

    console.log("✅ MongoDB connected");

    const server = app.listen(PORT, "0.0.0.0", () => {

      console.log(`
╔══════════════════════════════════════════════╗
║     Portfolio Backend Server — Started       ║
╠══════════════════════════════════════════════╣
║  Port  : ${PORT}
║  Mode  : ${process.env.NODE_ENV || "development"}
║  Email : ${process.env.EMAIL_USER}
╚══════════════════════════════════════════════╝
🚀 API ready on port ${PORT}
`);

    });

    // Verify mail connection asynchronously
    verifyConnection()
      .then(() => console.log("✅ SMTP mail server verified"))
      .catch(err =>
        console.warn("⚠️ SMTP verification failed (ignored on Render):", err.message)
      );

  } catch (error) {

    console.error("❌ Server failed to start");
    console.error(error);

    process.exit(1);
  }
}

startServer();
