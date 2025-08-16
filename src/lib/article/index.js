const { paginationDefaults } = require("../../config/defaults");
const { Article } = require("../../models");
const mongoose = require("mongoose");
const { badRequest, notFound } = require("../../utils/AppError");
const updateOneJSONPatch = require("./updateOneJSONPatch");
/**
 * Retrieves a paginated list of articles with sorting and search capabilities
 * @param {Object} options - The options for retrieving articles
 * @param {number} [options.page=1] - The page number to retrieve
 * @param {number} [options.limit=10] - Number of items per page
 * @param {string} [options.sortType="desc"] - Sort direction ("asc" or "desc")
 * @param {string} [options.sortBy="updatedAt"] - Field to sort by
 * @param {string} [options.search=""] - Search term to filter articles
 * @returns {Promise<Array>} Array of article documents matching the criteria
 */
const getAll = async ({
  page = paginationDefaults.page,
  limit = paginationDefaults.limit,
  sortType = paginationDefaults.sortType,
  sortBy = paginationDefaults.sortBy,
  search = paginationDefaults.search,
  select = "",
}) => {
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const filter = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ],
  };

  const result = await Article.find(filter)
    .populate("author", "name email")
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit)
    .select(select);

  return result.map((article) => ({
    ...article._doc,
  }));
};

/**
 * Counts total number of articles matching the search criteria
 * @param {Object} options - The options for counting articles
 * @param {string} [options.search=""] - Search term to filter articles
 * @returns {Promise<number>} Total count of matching articles
 */
const countTotal = async ({ search = "" }) => {
  try {
    const filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    };
    return await Article.countDocuments(filter);
  } catch (error) {
    console.error("Error counting articles:", error);
    throw new Error("Failed to count articles");
  }
};

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
  await article.save();
  return {
    ...article._doc,
  };
};

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
  if (!id) throw badRequest("id is required");
  if (!mongoose.isValidObjectId(id)) throw badRequest("Invalid id");

  expand = expand?.split(",")?.map((item) => item.trim()) || [];

  const article = await Article.findById(id);
  if (!article) throw notFound();

  if (expand.includes("author")) {
    await article.populate({ path: "author", select: "name" });
  }

  return article._doc;
};

/**
 * Updates an existing article or creates a new one if it doesn't exist
 * @param {string} id - The ID of the article to update
 * @param {Object} params - The article parameters
 * @param {string} params.title - The title of the article
 * @param {string} params.body - The main content of the article
 * @param {string} [params.cover=""] - URL of the article's cover image
 * @param {string} [params.status="draft"] - Publication status of the article
 * @param {Object} params.author - The author object containing user information
 * @param {string} params.author.id - The unique identifier of the author
 * @returns {Promise<Object>} Object containing the article document and HTTP status code
 * @throws {AppError} When ID is not provided or invalid (400)
 */
const updateOrCreate = async (
  id,
  { title, body, cover = "", status = "draft", author }
) => {
  if (!id) throw badRequest("id is required");
  if (!mongoose.isValidObjectId(id)) throw badRequest("Invalid id");

  const article = await Article.findById(id);
  if (!article) {
    const newArticle = await create({
      title,
      body,
      cover,
      status,
      author,
    });
    return {
      article: newArticle,
      status: 201,
    };
  }

  const payload = {
    title,
    body,
    cover,
    status,
    author: author?.id || article.author,
  };

  article.overwrite(payload);
  await article.save();

  return {
    article: article._doc,
    status: 200,
  };
};

/**
 * Updates specified properties of an existing article
 * @param {string} id - The ID of the article to update
 * @param {Object} params - The article parameters to update
 * @returns {Promise<Object>} The updated article document
 * @throws {AppError} When ID is not provided or invalid (400)
 * @throws {AppError} When article is not found (404)
 */
const updateProperties = async (id, { title, body, cover, status } = {}) => {
  if (!id) throw badRequest("id is required");
  if (!mongoose.isValidObjectId(id)) throw badRequest("Invalid id");

  const article = await Article.findById(id);
  if (!article) throw notFound();

  article.title = title ?? article.title;
  article.body = body ?? article.body;
  article.cover = cover ?? article.cover;
  article.status = status ?? article.status;

  await article.save();
  return { ...article._doc };
};

const deleteOne = async (id) => {
  if (!id) throw badRequest("id is required");
  if (!mongoose.isValidObjectId(id)) throw badRequest("Invalid id");

  const article = await Article.findById(id);
  if (!article) throw notFound();

  /**
   * TODO: Asynchronously delete all associated comments
   */

  return article.deleteOne();
};

module.exports = {
  getAll,
  countTotal,
  create,
  getOne,
  updateOrCreate,
  updateProperties,
  updateOneJSONPatch,
  deleteOne,
};
