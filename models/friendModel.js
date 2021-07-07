const mongoose = require("mongoose");

const definitions = {
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
    max: 120,
    min: 1,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  contactInfo: {
    email: {
      type: String
    },
    mobile: {
      type: Number
    },
    github: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    }
  }
};

const friendSChema = new mongoose.Schema(definitions);

module.exports = mongoose.model("Friend", friendSChema);
