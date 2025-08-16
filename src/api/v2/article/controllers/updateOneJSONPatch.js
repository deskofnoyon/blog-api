const { sendSuccessResponse } = require("../../../../utils");
const articleService = require("../../../../lib/article");

const updateOneJSONPatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await articleService.updateOneJSONPatch(
      id,
      req.body?.operations
    );

    sendSuccessResponse(res, {
      status: 200,
      message: "Article updated successfully",
      data: "hello",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateOneJSONPatch;
