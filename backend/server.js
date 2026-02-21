'use strict';

require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const reviewRoute = require('./routes/reviewRoute');
const { verifyConnection } = require('./config/mailConfig');

const app  = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://thiru7869.github.io',
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: Origin "${origin}" not allowed.`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: false,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

app.use('/api/review', reviewRoute);

app.get('/', (req, res) => {
  res.json({
    service: 'Portfolio Backend API', version: '1.0.0', status: 'running',
    emailRecipient: 'reddytn4@gmail.com',
    endpoints: {
      POST: '/api/review — Submit a portfolio review',
      GET:  '/api/review/health — Route health check',
    },
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found.` });
});

app.use((err, req, res, _next) => {
  if (err.message?.startsWith('CORS:')) {
    return res.status(403).json({ success: false, message: err.message });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(PORT, async () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║     Portfolio Backend Server — Started       ║');
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  Port    : ${PORT}                                ║`);
  console.log(`║  Mode    : ${process.env.NODE_ENV || 'development'}                     ║`);
  console.log(`║  Email → : reddytn4@gmail.com                ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  await verifyConnection();
  console.log(`\n🚀 API ready at http://localhost:${PORT}\n`);
});

module.exports = app;
