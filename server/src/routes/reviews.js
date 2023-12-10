const express = require("express");
const router = express.Router();
const controllers = require("../controllers/reviews");

// route => /reviews/...

router.get("/", controllers.getAllReviews);

router.get("/owner-review", controllers.getReviewsByOwner);

router.get("/caregiver-review", controllers.getReviewsByCaregiver);

router.get("/:id", controllers.getReview);

router.post("/", controllers.createReview);

router.put("/:id", controllers.updateReview);

router.delete("/:id", controllers.deleteReview);

module.exports = router;
