const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
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
    min: 1,
    max: 120,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  contactInfo: {
    email: {
      type: String,
      default: 'Not Provided',
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      default: 1234567890,
    },
    twitterHandle: {
      type: String,
      default: 'Not Provided',
    },
  },
});

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;
