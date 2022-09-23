const jwt = require("jsonwebtoken");
const config = require("config");
const seedJWT = config.get("seedJWT");

/**
 * It takes a payload and options, and returns a signed JWT using 
 * the seedJWT variable as the secret
 * @param payload - The data you want to sign.
 * @param options - {
 * @returns A JWT
 */
function signJwt(payload, options) {
  return jwt.sign(payload, seedJWT, {
    ...(options && options),
    // algorithm: "RS256",
  });
}

/**
 * It returns an object with three properties: valid, expired, and decoded. 
 * 
 * The valid property is a boolean that is true if the token is valid and false if it is not. 
 * 
 * The expired property is a boolean that is true if the token is expired and false if it is not. 
 * 
 * The decoded property is the decoded token if the token is valid and null if it is not. 
 * 
 * The function is async because it uses the jwt.verify() function which is async. 
 * 
 * The function uses the jwt.verify() function to verify the token. 
 * 
 * If the token is valid, the function returns an object with the valid property set to true, the
 * expired property set to false, and the decoded property set to the decoded token. 
 * 
 * @param token - The token to verify
 * @returns An object with three properties: valid, expired, and decoded.
 */
async function verifyJwt(token) {
  try {
    const decoded = await jwt.verify(token, seedJWT);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

module.exports = {
  signJwt,
  verifyJwt,
};
