const { Router } = require("express");
const { controllers: articleControllersV1 } = require("../api/v1/article");

const { controllers: articleControllersV2 } = require("../api/v2/article");

const router = Router();

router
  .route("/v1/articles")
  .get(articleControllersV1.getAll)
  .post(articleControllersV1.create);

router
  .route("/v1/articles/:id")
  .get(articleControllersV1.getOne)
  .put(articleControllersV1.updateOnePut)
  .patch(articleControllersV1.updateOnePatch)
  .delete(articleControllersV1.deleteOne);

// version 2 JSON Patch
router.route("/v2/articles/:id").patch(articleControllersV2.updateOneJSONPatch);

module.exports = router;
