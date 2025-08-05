const { paginationDefaults } = require("../../config/defaults");
const { Article } = require("../../models");

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

module.exports = {
  getAll,
  countTotal,
};
