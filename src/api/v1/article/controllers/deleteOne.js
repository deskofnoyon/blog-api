const articleService = require("../../../../lib/article");
const { sendSuccessResponse } = require("../../../../utils");

const deleteOne = async (req, res) => {
  const { id } = req.params;
  await articleService.deleteOne(id);
  sendSuccessResponse(res, {
    status: 204,
    message: "Article deleted successfully",
  });
};

module.exports = deleteOne;
