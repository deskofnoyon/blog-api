/**
 * Generates a URL query string from an object of key-value pairs
 * @param {Object} query - An object containing query parameters
 * @returns {string} A URL-encoded query string in the format "key1=value1&key2=value2"
 * @example
 * generateQueryString({ name: "John Doe", age: 30 })
 * // Returns: "name=John%20Doe&age=30"
 */
const generateQueryString = (query) => {
  const queryString = Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
  return queryString;
};

module.exports = { generateQueryString };
