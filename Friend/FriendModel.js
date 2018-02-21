const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  createdOn: { type: Date, required: true, default: Date.now }
});

const FriendModel = mongoose.model("Friends", FriendSchema);

module.exports = FriendModel;
