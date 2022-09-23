const morgan = require("morgan");
const verifyToken = require("../middlewares/verifyToken.middleware");
const createServer = require("../utils/server");

const authController = require("./auth");
const protectedController = require("./protected");

const api = createServer();

/**
 * Routes
 */
api.get("/", (req, res, next) => res.send("Nodejs API"));
api.use("/auth", authController);
api.use(verifyToken);
api.use("/protected", protectedController);

module.exports = api;
