const articleService = require("../../../../lib/article");
const { sendSuccessResponse } = require("../../../../utils");

const updateOnePatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await articleService.updateProperties(id, req?.body);
    sendSuccessResponse(res, {
      status: 200,
      message: "Article updated successfully",
      data: { article },
      links: {
        self: `/api/v1/articles/${article._id}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateOnePatch;
