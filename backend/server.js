require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const { globalLimiter } = require("./middleware/rateLimiter");
const { verifyConnection } = require("./config/mailConfig");

const app = express();

// =============================
// BASIC MIDDLEWARE
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
  "http://localhost:5501",
  "http://127.0.0.1:5501",
  process.env.FRONTEND_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
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
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
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
// START SERVER
// =============================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // SMTP check
    await verifyConnection();

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`
╔══════════════════════════════════════════════╗
║     Portfolio Backend Server — Started       ║
╠══════════════════════════════════════════════╣
║  Port  : ${PORT}
║  Mode  : ${process.env.NODE_ENV}
║  Email : ${process.env.EMAIL_USER}
╚══════════════════════════════════════════════╝

🚀 API ready on port ${PORT}
`);
    });
  } catch (error) {
    console.error("❌ Server failed to start");
    console.error(error);
    process.exit(1);
  }
}

startServer();