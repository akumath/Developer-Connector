const express = require("express");
const router = express.Router();

// @ROUTE GET api/posts
// @DESC TEST ROUTE
// @ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("posts api");
});

module.exports = router;
