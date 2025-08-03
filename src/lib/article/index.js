const { getAll, countTotal } = require("./getAll");
const { create } = require("./create");

const articleService = {
  getAll,
  countTotal,
  create,
};

module.exports = { articleService };
