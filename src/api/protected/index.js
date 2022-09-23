const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("protected route");
});

module.exports = router;
