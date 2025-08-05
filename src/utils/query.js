const { paginationDefaults } = require("../config/defaults");
const { generateQueryString } = require("./generateQueryString");

/**
 *
 * Generates pagination metadata for any resource
 * @param {Object} options - The pagination options
 * @param {number} options.page - Current page number
 * @param {number} options.limit - Number of items per page
 * @param {number} options.totalItems - Total number of items across all pages
 * @returns {Object} Pagination metadata object containing:
 *   - page: {number} Current page number
 *   - limit: {number} Items per page
 *   - prev: {number|null} Previous page number or null if on first page
 *   - next: {number|null} Next page number or null if on last page
 *   - totalPage: {number} Total number of pages
 *   - totalItems: {number} Total number of items
 */
const generatePagination = ({
  page = paginationDefaults.page,
  limit = paginationDefaults.limit,
  totalItems = paginationDefaults.totalItems,
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    prev: page > 1 ? page - 1 : null,
    next: page < totalPage ? page + 1 : null,
    totalPage,
    totalItems,
  };
};

/**
 * Generates HATEOAS links for any resource with pagination
 * @param {Object} options - The options for generating links
 * @param {string} options.basePath - Base path for the resource (e.g., '/articles')
 * @param {number} options.page - Current page number
 * @param {number} options.limit - Number of items per page
 * @param {number} options.totalItems - Total number of items across all pages
 * @param {Object} [options.additionalParams={}] - Additional query parameters to include
 * @returns {Object} Link object containing:
 *   - self: {string} Link to current page
 *   - prev: {string|null} Link to previous page or null if on first page
 *   - next: {string|null} Link to next page or null if on last page
 */
const generateHateoasLinks = ({
  basePath,
  page,
  limit,
  totalItems,
  additionalParams = {},
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  const baseQuery = { ...additionalParams, limit };
  const selfQuery = { ...baseQuery, page };
  const self = `${basePath}?${generateQueryString(selfQuery)}`;

  const prev =
    page > 1
      ? (() => {
          const prevQuery = { ...baseQuery, page: page - 1 };
          return `${basePath}?${generateQueryString(prevQuery)}`;
        })()
      : null;

  const next =
    page < totalPage
      ? (() => {
          const nextQuery = { ...baseQuery, page: parseInt(page) + 1 };
          return `${basePath}?${generateQueryString(nextQuery)}`;
        })()
      : null;

  return {
    self,
    prev,
    next,
  };
};

/**
 * Generates simple HATEOAS links without additional parameters (backward compatibility)
 * @param {Object} options - The options for generating links
 * @param {string} options.basePath - Base path for the resource
 * @param {number} options.page - Current page number
 * @param {number} options.limit - Number of items per page
 * @param {number} options.totalItems - Total number of items across all pages
 * @returns {Object} Link object
 */
const generateSimpleLinks = ({ basePath, page, limit, totalItems }) => {
  return generateHateoasLinks({ basePath, page, limit, totalItems });
};

module.exports = {
  generateHateoasLinks,
  generateSimpleLinks,
  generatePagination,
};
