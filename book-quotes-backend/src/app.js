const express = require('express');
const cors = require('cors');
const path = require('path');
const quoteRoutes = require('./routes/quoteRoutes');
const { initializeDatabase } = require('./models/quoteModel');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// API Routes
app.use('/api/quotes', quoteRoutes);

// Catch-all for React frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Initialize DB
initializeDatabase();

module.exports = app;
