const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const inquiryController = require('../controllers/inquiryController');
const validateRequest = require('../middlewares/validateRequest');
const { inquiryRateLimiter } = require('../middlewares/rateLimiter');

// Validation rules for POST /api/inquiry
const inquiryValidationRules = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Full name must contain only letters and spaces'),

  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2 })
    .withMessage('Company name must be at least 2 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d+\-\s()]{7,20}$/)
    .withMessage('Please provide a valid phone number format (between 7 and 20 digits, spaces, dashes or parentheses allowed)'),

  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),

  body('industry')
    .trim()
    .notEmpty()
    .withMessage('Industry is required')
    .isIn(['Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 'Manufacturing', 'Other'])
    .withMessage('Industry must be one of: Technology, Healthcare, Finance, Retail, Education, Manufacturing, Other'),

  body('companySize')
    .trim()
    .notEmpty()
    .withMessage('Company size is required')
    .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
    .withMessage('Company size must be one of: 1-10, 11-50, 51-200, 201-500, 500+'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters')
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
];

// Router mappings
router.post('/', inquiryRateLimiter, inquiryValidationRules, validateRequest, inquiryController.createInquiry);
router.get('/', inquiryController.getInquiries);
router.get('/:id', inquiryController.getInquiryById);
router.delete('/:id', inquiryController.deleteInquiry);

module.exports = router;
