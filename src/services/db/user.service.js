const User = require("../../models/User");

const createUser = async (props) => {
  return User.create(props);
};

module.exports = { createUser };
