require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const inquiryRoutes = require('./routes/inquiryRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

// Connect to MongoDB (skip during testing to let Jest handle it)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();

// CORS configuration - allow Vite dev server origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/inquiry', inquiryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Catch 404 (Not Found) routes
app.use((req, res, next) => {
  const error = new Error(`API endpoint not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Promise Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

module.exports = app;
