const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true
  },
  Age: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
