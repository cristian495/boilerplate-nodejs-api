const singup = async (req, res, next) => {
  try {
    res.send("create user");
  } catch (error) {
    next(error);
  }
};

module.exports = singup;
