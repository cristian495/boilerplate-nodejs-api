const jwt = require("jsonwebtoken");
const config = require("config");
const APIError = require("../utils/errors/APIError");
const { verifyJwt } = require("../utils/jwt.utils");

const verifyToken = async (req, res, next) => {
  try {
    let jwttoken = req.headers["authorization"];

    if (!jwttoken)
      throw new APIError({
        message: "No se ha enviado un JWT",
        httpError: 401,
      });

    const TokenArray = jwttoken.split(" ");

    if (TokenArray[0] !== "Bearer") {
      throw new APIError({
        message: "El formato del Token es incorrecto",
        httpError: 401,
      });
    }
    const token = TokenArray[1];

    if (!token)
      throw new APIError({
        message: "Faltó enviar el token despues de Bearer",
        httpError: 401,
      });

    const { valid, expired, decoded } = await verifyJwt(token);
    if (!valid || expired) {
      throw new APIError({
        message: "Invalid token, expired or malformed",
        httpError: 401,
        code: "invalid-token",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
