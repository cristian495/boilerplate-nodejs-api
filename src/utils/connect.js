const mongoose = require("mongoose");
const config = require("config");

async function connect() {
  const db = config.get("db");
  try {
    await mongoose.connect(db, {}, (err) => {
      if (err) console.log(err);
      else console.log("mongdb is connected");
    });
    console.log("               ");
    console.log("               ");
    console.log("***************");
    console.log("###############");
    console.log("MONGODBURI");
    console.log(db);
    // console.log("!!!!!!***PROTECTED***!!!!!!");
    console.log("###############");
    console.log("***************");
    console.log("               ");
    console.log("               ");
  } catch (error) {
    console.log("Could not connect to db");
    process.exit(1);
  }
}

module.exports = connect;
