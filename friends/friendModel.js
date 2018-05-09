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
      required: true

  },
  contactInfo: {
    email: {
      type:String
    },
    mobile: {
      type:Number
    },
    githubUsername: {
      type:String
    },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
};

const options = {
  timestamps: true,
};

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;