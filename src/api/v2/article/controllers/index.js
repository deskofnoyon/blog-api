const getAll = require("./getAll");
const create = require("./create");
const getOne = require("./getOne");
const updateOnePut = require("./updateOnePut");
const deleteOne = require("./deleteOne");
const updateOneJSONPatch = require("./updateOneJSONPatch");

module.exports = {
  getAll,
  create,
  getOne,
  updateOnePut,
  updateOneJSONPatch,
  deleteOne,
};
