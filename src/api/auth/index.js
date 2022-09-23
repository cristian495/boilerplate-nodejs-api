const express = require("express");
const singup = require("./processors/singup.js");
const router = express.Router();

router.post("/auth/", singup);

module.exports =  router;
