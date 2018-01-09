const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;