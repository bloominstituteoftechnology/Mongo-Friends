const mongoose = require("mongoose");

// firstName, lastName, age, and createdOn
// contactInfo is a nested. (email, mobile, github, twitter, facebook)
const definition = {
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
    required: true,
    min: 1,
    max: 120
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  contactInfo: {
    email: {
      type: String,
      required: false
    },
    mobile: {
      type: String,
      reqruied: false
    },
    github: {
      type: String,
      reqruied: false
    },
    facebook: {
      type: String,
      reqruied: false
    },
    twitter: {
      type: String,
      reqruied: false
    }
  }
};

const options = {
  timestamp: true
};

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model("Friend", friendSchema, "friends");

module.exports = friendModel;
