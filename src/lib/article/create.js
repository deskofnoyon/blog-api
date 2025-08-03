const { Article } = require("../../models");

/**
 * Creates a new article in the database
 * @param {Object} params - The article parameters
 * @param {string} params.title - The title of the article
 * @param {string} [params.body=""] - The main content of the article
 * @param {string} [params.cover=""] - URL of the article's cover image
 * @param {string} [params.status="draft"] - Publication status of the article
 * @param {Object} params.author - The author object containing user information
 * @param {string} params.author.id - The unique identifier of the author
 * @returns {Promise<Object>} The saved article document
 */
const create = async ({
  title,
  body = "",
  cover = "",
  status = "draft",
  author,
}) => {
  const article = new Article({
    title,
    body,
    cover,
    status,
    author: author?.id,
  });
  return article.save();
};

module.exports = { create };
