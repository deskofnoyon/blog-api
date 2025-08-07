const { Article } = require("../../models");
const { AppError } = require("../../utils");

/**
 * Retrieves a single article by ID with optional author expansion
 * @param {Object} params - The parameters object
 * @param {string} params.id - The ID of the article to retrieve
 * @param {string} [params.expand=""] - Comma-separated string of fields to expand (currently supports "author")
 * @returns {Promise<Object>} The article document
 * @throws {Error} When ID is not provided
 * @throws {AppError} When article is not found (404)
 */
const getOne = async ({ id, expand = "" }) => {
  if (!id) throw new Error("id is required");

  expand = expand?.split(",")?.map((item) => item.trim()) || [];

  const article = await Article.findById(id);
  if (!article) throw new AppError(404, "Article not found");

  if (expand.includes("author")) {
    await article.populate({ path: "author", select: "name" });
  }

  return article._doc;
};

module.exports = { getOne };
