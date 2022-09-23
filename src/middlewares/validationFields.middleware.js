const Validator = require("validatorjs");
const APIError = require("../utils/errors/APIError");
Validator.useLang("es");

let validateFields = (validationRule) => {
  return (req, res, next) => {
    if (!validationRule) {
      throw new APIError({
        message: "fields, rules, customMessages are required",
        httpError: 500,
      });
    } else {
      const validation = new Validator(
        req.body,
        validationRule
        // customMessages
      );
      // validation.setAttributeNames(friendlyAttributeNames);
      if (validation.fails()) {
        throw new APIError({
          message: "Campos invalidos",
          detail: validation.errors.errors,
          httpError: 400,
          code: "wrong-fields",
        });
      } else {
        next();
      }
    }
  };
};

const rules = {
  signup: {
    email: "required|email",
    password: "required|string|min:6",
  },
};

module.exports = { validateFields, rules };
