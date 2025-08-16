const { isValidObjectId } = require("mongoose");
const { Article } = require("../../models");
const { notFound, badRequest } = require("../../utils/AppError");

const restrictedPatch = ["/id", "/_id", "/author", "/createdAt", "/updatedAt"];

const updateOneJSONPatch = async (id, operations = []) => {
  if (!isValidObjectId(id)) throw badRequest("Invalid article id");

  const article = await Article.findById(id);
  if (!article) throw notFound();

  for (const operation of operations) {
    const { op, path, value } = operation;

    if (restrictedPatch.includes(path))
      throw badRequest(`Path (${path}) is not permitted`);
  }

  return article._doc;
};

module.exports = updateOneJSONPatch;
