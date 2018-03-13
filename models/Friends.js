const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const FriendsModel = mongoose.model("Friends", friendsSchema);

module.exports = FriendsModel;
