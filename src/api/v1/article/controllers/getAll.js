const { paginationDefaults } = require("../../../../config/defaults");
const { articleService } = require("../../../../lib/article");
const {
  generatePagination,
  generateHateoasLinks,
  sendSuccessResponse,
} = require("../../../../utils");
const { getTransformedItems } = require("../../../../utils/query");

const getAll = async (req, res, next) => {
  const page = req.query.page || paginationDefaults.page;
  const limit = req.query.limit || paginationDefaults.limit;
  const sortType = req.query.sortType || paginationDefaults.sortType;
  const sortBy = req.query.sortBy || paginationDefaults.sortBy;
  const search = req.query.search || paginationDefaults.search;
  const select = req.query.select || "";

  try {
    const result = await articleService.getAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
      select,
    });

    const articles = getTransformedItems({
      items: result,
      selection: ["_id", "title", "cover", "author", "updatedAt", "createdAt"],
      basePath: req.url,
    });

    const totalItems = await articleService.countTotal({ search });
    const pagination = generatePagination({
      page,
      limit,
      totalItems,
    });
    const links = generateHateoasLinks({
      basePath: req.url,
      page,
      limit,
      totalItems,
      additionalParams: {
        ...(sortType && { sortType }),
        ...(sortBy && { sortBy }),
        ...(search && { search }),
      },
    });

    sendSuccessResponse(res, {
      status: 200,
      message: "Articles retrieved successfully",
      data: {
        articles,
      },
      pagination,
      links,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
