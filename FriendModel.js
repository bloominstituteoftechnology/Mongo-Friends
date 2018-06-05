const mongoose = require('mongoose');

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
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  contactInfo: {
    email: { type: String },
    telephone: { type: Number }
  }
};

const friendSchema = new mongoose.Schema(definition);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;
