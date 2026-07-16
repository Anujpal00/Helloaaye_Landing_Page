const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      minlength: [2, 'Company name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
      enum: {
        values: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 'Manufacturing', 'Other'],
        message: '{VALUE} is not a supported industry',
      },
    },
    companySize: {
      type: String,
      required: [true, 'Company size is required'],
      trim: true,
      enum: {
        values: ['1-10', '11-50', '51-200', '201-500', '500+'],
        message: '{VALUE} is not a supported company size',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for searching name, company, email
InquirySchema.index({ fullName: 'text', companyName: 'text', email: 'text' });

module.exports = mongoose.model('Inquiry', InquirySchema);
