const { createUser } = require("../../../services/db/user.service");

const singup = async (req, res, next) => {
  try {
    const body = req.body;
    const userCreated = await createUser(body);
    
    res.status(201).json({ success: true, user: userCreated });
  } catch (error) {
    next(error);
  }
};

module.exports = singup;
