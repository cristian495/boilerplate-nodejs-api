const mongoose = require("mongoose");

let User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
});

mongoose.model("User", User);
module.exports = mongoose.model("User");
