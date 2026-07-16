const { validationResult } = require('express-validator');
const { sendError } = require('../utils/apiResponse');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err) => `${err.path || err.param}: ${err.msg}`);
    return sendError(res, 'Validation failed', 400, errorMsgs);
  }
  next();
};

module.exports = validateRequest;
