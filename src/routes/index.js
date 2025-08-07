const { Router } = require("express");
const { controllers } = require("../api/v1/article");

const router = Router();

// blog routes
router.route("/v1/articles").get(controllers.getAll).post(controllers.create);

router
  .route("/v1/articles/:id")
  .get(controllers.getOne)
  .put(controllers.updateOnePut)
  .patch(controllers.updateOnePatch)
  .delete(() => {});

module.exports = router;
