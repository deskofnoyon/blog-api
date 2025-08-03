/**
 * Generic data transformer that can be used for any resource
 * @param {Array} items - Array of items to transform
 * @param {Function} transformer - Function to transform each item
 * @returns {Array} Transformed items
 */
const transformData = (items, transformer) => {
  return items.map(transformer);
};

module.exports = {
  transformData,
};
