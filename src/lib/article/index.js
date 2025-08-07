const { getAll, countTotal } = require("./getAll");
const { create } = require("./create");
const { getOne } = require("./getOne");

const articleService = {
  getAll,
  countTotal,
  create,
  getOne,
};

module.exports = { articleService };
