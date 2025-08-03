/**
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
const generatePagination = ({ page, limit, totalItems }) => {
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

module.exports = { generatePagination };
