const articleService = require("../../../../lib/article");
const { sendSuccessResponse } = require("../../../../utils");

const updateOnePut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cover = req.body?.cover || "";
    const status = req.body?.status || "draft";
    const user = req?.user;

    const { article, status: articleStatus } =
      await articleService.updateOrCreate(id, {
        title: req.body?.title,
        body: req.body?.body,
        cover,
        status,
        author: user,
      });

    sendSuccessResponse(res, {
      status: articleStatus,
      message:
        articleStatus === 200
          ? "Article updated successfully"
          : "Article Created successfully",
      data: { article },
      links: {
        self: `/api/v1/articles/${article._id}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateOnePut;
