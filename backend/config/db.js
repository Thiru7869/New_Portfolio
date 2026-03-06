// config/db.js — MongoDB Atlas Connection
'use strict';

const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not defined in environment variables.');

  await mongoose.connect(uri, {
    dbName: 'portfolio_reviews',
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
  });

  isConnected = true;

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected. Attempting reconnect…');
    isConnected = false;
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected.');
    isConnected = true;
  });
}

module.exports = { connectDB };