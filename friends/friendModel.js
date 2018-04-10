const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
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
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    twitterHandle: {
      type: String,
      required: false
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const friendModel = mongoose.model('Friend', friendSchema); // friends collection

module.exports = friendModel;
