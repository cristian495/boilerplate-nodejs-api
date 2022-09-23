const express = require("express");
const {
  validateFields,
  rules,
} = require("../../middlewares/validationFields.middleware");
const singup = require("./processors/singup");
const router = express.Router();

router.post("/singup", validateFields(rules.signup), singup);

module.exports = router;
