const articleService = require("../../../../lib/article");
const { sendSuccessResponse } = require("../../../../utils");

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const { expand } = req.query;
  try {
    const article = await articleService.getOne({ id, expand });

    sendSuccessResponse(res, {
      status: 200,
      data: { article },
      message: "Article fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOne;
