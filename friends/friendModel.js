const mongoose = require("mongoose");

const definition = {
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
};

const options = {
  timestamp: true
};

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model("Friend", friendSchema, "friends");

module.exports = friendModel;