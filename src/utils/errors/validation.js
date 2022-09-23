const Validator = require("validatorjs");

/**
 * @param body - The request body.
 * @param rules - The rules to validate against.
 * @param customMessages - This is an object that contains the custom messages you want to use for the
 * validation.
 * @param callback - The callback function to be called when the validation is complete.
 */
const validator = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => callback(null, true));

  validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;
