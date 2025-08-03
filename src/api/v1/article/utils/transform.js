const { transformData } = require("../../../../utils");

/**
 * Transforms article data by adding links and other metadata
 * @param {Array} articles - Array of article documents
 * @param {string} basePath - Base path for generating links
 * @returns {Array} Transformed articles with added metadata
 */
const transformArticles = (articles, basePath) => {
  return transformData(articles, (article) => ({
    ...article._doc,
    link: `${basePath}/${article.id}`,
  }));
};

module.exports = { transformArticles };
