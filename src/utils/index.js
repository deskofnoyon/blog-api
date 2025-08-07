/**
 * Utility functions for data transformation, pagination, and HATEOAS link generation
 *
 * Usage examples:
 *
 * // Data transformation
 * const articles = transformArticles(result, req.path);
 *
 * // Pagination
 * const pagination = generatePagination({ page, limit, totalItems });
 *
 * // HATEOAS links with query parameters
 * const links = generateHateoasLinks({
 *   basePath: '/articles',
 *   page,
 *   limit,
 *   totalItems,
 *   additionalParams: { sortType, sortBy, search }
 * });
 *
 * // Success response with all optional fields
 * sendSuccessResponse(res, {
 *   status: 200,
 *   message: 'Articles retrieved successfully',
 *   data: { articles },
 *   pagination,
 *   links
 * });
 *
 * // Simple success response
 * sendSuccessResponse(res, {
 *   status: 201,
 *   message: 'Article created successfully',
 *   data: { article },
 *   links
 * });
 *
 * // Error response
 * sendErrorResponse(res, {
 *   status: 400,
 *   message: 'Validation failed',
 *   errors: ['Title is required']
 * });
 * 
 * // Using AppError class
 * throw AppError.badRequest('Invalid input', ['Title is required']);
 * throw AppError.notFound('Article not found');
 * throw AppError.unauthorized('Access denied');
 * 
 * // Custom AppError
 * throw new AppError('Custom error message', 422, { field: 'validation error' });
 */

const { generateQueryString } = require("./qs");
const {
  generateHateoasLinks,
  generatePagination,
  generateSimpleLinks,
} = require("./query");
const { sendSuccessResponse, sendErrorResponse } = require("./responseFormatter");
const AppError = require("./AppError");

module.exports = {
  generateQueryString,
  generatePagination,
  generateHateoasLinks,
  generateSimpleLinks,
  sendSuccessResponse,
  sendErrorResponse,
  AppError,
};
