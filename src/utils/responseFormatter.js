/**
 * Utility functions for formatting consistent API responses
 */

/**
 * Creates a standardized success response structure with all optional fields
 * @param {Express.Response} res - Express response object
 * @param {Object} options - Response options
 * @param {number} options.status - HTTP status code
 * @param {string} options.message - Success message
 * @param {Object} [options.data] - Response data (optional)
 * @param {Object} [options.pagination] - Pagination metadata (optional)
 * @param {Object} [options.links] - HATEOAS links (optional)
 * @param {Object} [options.meta] - Additional metadata (optional)
 * @param {Object} [options.errors] - Error details for error responses (optional)
 * @returns {Object} Formatted response object
 */
const sendSuccessResponse = (
  res,
  { status, message, data, pagination, links, meta }
) => {
  const response = {
    success: true,
    status,
    message,
  };

  // Add optional fields only if they exist
  if (data) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  if (links) {
    response.links = links;
  }

  if (meta) {
    response.meta = meta;
  }

  res.status(status).json(response);
};

/**
 * Creates a standardized error response structure
 * @param {Express.Response} res - Express response object
 * @param {Object} options - Error response options
 * @param {number} options.status - HTTP status code
 * @param {string} options.message - Error message
 * @param {Array} [options.errors] - Array of detailed errors (optional)
 * @param {Object} [options.meta] - Additional metadata (optional)
 */
const sendErrorResponse = (res, { status, message, errors, meta }) => {
  const response = {
    success: false,
    status,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  if (meta) {
    response.meta = meta;
  }

  res.status(status).json(response);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
