'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { globalLimiter } = require('./middleware/rateLimiter');
const reviewRoutes = require('./routes/reviewRoutes');
const { sendContactEmail } = require('./controllers/contactController');

const app = express();

const ALLOWED_ORIGINS = [
  'https://thiru7869.github.io',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(globalLimiter);

app.get('/', (_req, res) => res.json({ success: true, message: 'Portfolio API running.' }));

app.use('/api/review', reviewRoutes);
app.post('/api/contact', sendContactEmail);

app.use((_req, res) => res.status(404).json({ success: false, message: 'Not found.' }));

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
