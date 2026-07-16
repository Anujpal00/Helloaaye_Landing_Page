const rateLimit = require('express-rate-limit');
const { sendError } = require('../utils/apiResponse');

const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: 'Too many inquiry submissions from this IP. Please try again after 15 minutes.',
  handler: (req, res, next, options) => {
    return sendError(res, options.message, 429);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  inquiryRateLimiter,
};
