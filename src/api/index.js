const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  logError,
  returnError,
} = require("../middlewares/errorHandler.middleware");
const verifyToken = require("../middlewares/verifyToken.middleware");
const createServer = require("../utils/server");

/**
 * Controllers imports
 */
const authController = require("./auth");
const protectedController = require("./protected");

const api = createServer();

/**
 * Logs
 */
api.use(morgan("dev"));

/*
 * Body in json
 */
api.use(bodyParser.json());

/**
 * Cors
 */
api.use(cors());
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

/**
 * Routes
 */
api.get("/", (req, res, next) => res.send("Nodejs API"));
api.use("/auth", authController);
api.use(verifyToken);
api.use("/protected", protectedController);

/**
 * Error handler
 */
api.use(logError);
api.use(returnError);

module.exports = api;
