const express = require("express");
const router = express.Router();

// @ROUTE GET api/auth
// @DESC TEST ROUTE
// @ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("auth api");
});

module.exports = router;
