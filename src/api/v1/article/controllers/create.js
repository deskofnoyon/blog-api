const { articleService } = require("../../../../lib/article");

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
    res.status(201).json({
      success: true,
      status: 201,
      message: "Article created successfully",
      data: {
        article,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
