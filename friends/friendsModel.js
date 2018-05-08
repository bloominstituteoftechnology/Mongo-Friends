const mongoose = require('mongoose');

const contactInfo = {
  type: Object,
  required: true,

  email: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: Number,
    required: false
  },
  githubUsername: {
    type: String,
    required: false
  },
  facebookUsername: {
    type: String,
    required: false
  },
  twitterHandle: {
    type: String,
    required: false
  }
}

const defineSchema = {
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
  contactInfo
}

const options = { timestamps: true }

const friendSchema = new mongoose.Schema(defineSchema, options)

const friendsModel = mongoose.model('Friend', friendSchema, 'friends')
// module.exports = mongoose.model('Friend', friendSchema, 'friends')
module.exports = friendsModel;