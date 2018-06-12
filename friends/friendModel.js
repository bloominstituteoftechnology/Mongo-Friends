const mongoose = require('mongoose');

const definition = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contactInfo: {
    email: String,
    mobileNumber: String,
    githubUsername: String,
    facebookUsername: String,
    twitterHandle: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
};

const friendSchema = new mongoose.Schema(definition);

module.exports = mongoose.model('Friend', friendSchema);