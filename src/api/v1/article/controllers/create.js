const { articleService } = require("../../../../lib/article");
const { sendSuccessResponse } = require("../../../../utils");

const create = async (req, res, next) => {
  const { title, body, cover, status } = req.body ?? {};
  try {
    const article = await articleService.create({
      title,
      body,
      cover,
      status,
      author: req?.user,
    });

    const links = {
      self: `${req.url}/${article._id}`,
      author: `${req.url}/${article._id}/author`,
      comments: `${req.url}/${article._id}/comments`,
    };

    sendSuccessResponse(res, {
      status: 201,
      message: "Article created successfully",
      data: { article },
      links,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
