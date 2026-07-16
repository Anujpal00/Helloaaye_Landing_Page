const Inquiry = require('../models/Inquiry');
const { sendSuccess } = require('../utils/apiResponse');

// @desc    Create new inquiry
// @route   POST /api/inquiry
// @access  Public
exports.createInquiry = async (req, res, next) => {
  try {
    const { fullName, companyName, email, phoneNumber, country, industry, companySize, message } = req.body;

    const inquiry = await Inquiry.create({
      fullName,
      companyName,
      email,
      phoneNumber,
      country,
      industry,
      companySize,
      message,
    });

    return sendSuccess(res, 'Product inquiry submitted successfully', inquiry, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries with search, filters & pagination
// @route   GET /api/inquiry
// @access  Public (or Admin)
exports.getInquiries = async (req, res, next) => {
  try {
    const { search, industry, country } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Dynamic text-like regex search for multiple fields
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { fullName: searchRegex },
        { companyName: searchRegex },
        { email: searchRegex },
      ];
    }

    // Filter by industry
    if (industry && industry !== 'All' && industry.trim() !== '') {
      query.industry = industry;
    }

    // Filter by country
    if (country && country !== 'All' && country.trim() !== '') {
      query.country = country;
    }

    const totalCount = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    return sendSuccess(res, 'Inquiries retrieved successfully', {
      inquiries,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inquiry by ID
// @route   GET /api/inquiry/:id
// @access  Public (or Admin)
exports.getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      const error = new Error('Inquiry not found');
      error.statusCode = 404;
      return next(error);
    }

    return sendSuccess(res, 'Inquiry retrieved successfully', inquiry);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry by ID
// @route   DELETE /api/inquiry/:id
// @access  Public (or Admin)
exports.deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      const error = new Error('Inquiry not found');
      error.statusCode = 404;
      return next(error);
    }

    return sendSuccess(res, 'Inquiry deleted successfully', null);
  } catch (error) {
    next(error);
  }
};
