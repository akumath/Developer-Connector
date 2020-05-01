const express = require("express");
const router = express.Router();

// @ROUTE GET api/users
// @DESC TEST ROUTE
// @ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("user api");
});

module.exports = router;
