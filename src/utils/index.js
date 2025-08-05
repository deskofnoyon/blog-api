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
 */

const { generateQueryString } = require("./generateQueryString");
const { transformData } = require("./dataTransform");
const {
  generateHateoasLinks,
  generatePagination,
  generateSimpleLinks,
} = require("./query");

module.exports = {
  generateQueryString,
  transformData,
  generatePagination,
  generateHateoasLinks,
  generateSimpleLinks,
};
