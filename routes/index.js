const express = require("express");
const router = express.Router();

// GET home page
router.get("/", (req, res, next) => {
  res.redirect("/messages");
});

module.exports = router;
