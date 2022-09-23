const api = require("./api");
// const https = require("https");
const config = require("config");
const connect = require("./utils/connect");
const environment = config.util.getEnv("NODE_ENV");

console.log("*******************");
console.log(`Server environment: ${environment.toUpperCase()}`);
console.log("*******************");

const port = config.get("port");

api.listen(port, async () => {
  await connect();
  console.log("API listening on port " + port);
});
