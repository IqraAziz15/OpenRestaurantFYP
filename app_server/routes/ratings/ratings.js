var express = require('express');
var router = express.Router();
  const ratingsController = require("../../controllers/ratings/ratingsController");

  // /api/ratings/
  router.get("/allratings",ratingsController.getRatings);
  router.post("/allcustomerratings",ratingsController.getRatingsCustomer);
  router.post("/rating",ratingsController.getRating);
  router.put("/changeratings",ratingsController.changeRating);
  router.post("/rate",ratingsController.rate);
  router.delete("/removeratings",ratingsController.removeRating);

module.exports = router;

