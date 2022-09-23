const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const createServer = () => {
  const api = express();

  // MORGAN FOR REQUESTS LOGS
  api.use(morgan("dev"));

  // ALLOW BIG FILES TRANSFER
  api.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
  api.use(bodyParser.json());

  // ACCEPTING CROSS SITE REQUESTS
  api.use(cors());
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

  return api;
};

module.exports =  createServer;
