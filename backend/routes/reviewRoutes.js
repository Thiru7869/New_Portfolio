const express = require("express");
const router = express.Router();

// import controller
const { submitReview } = require("../controllers/reviewController");

// route
router.post("/", submitReview);

module.exports = router;