require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
app.use(`/${UPLOAD_DIR}`, express.static(path.join(__dirname, UPLOAD_DIR)));

// Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
