const express = require("express");
const router = express.Router();

// @ROUTE GET api/profile
// @DESC TEST ROUTE
// @ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("profile api");
});

module.exports = router;
