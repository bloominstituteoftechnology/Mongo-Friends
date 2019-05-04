const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
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
      min: 1,
      max: 120,
    },
    contactInfo: {
      email: {
        type: String,
      },
      mobile_number: {
        type: Number,
      },
      github_username: {
        type: String,
      },
      facebook_username: {
        type: String,
      },
      twtter_handle: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const friendModel = mongoose.model('Friend', friendSchema); //friends collection
module.exports = friendModel;
