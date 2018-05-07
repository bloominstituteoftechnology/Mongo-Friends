const mongoose = require('mongoose');

const definition = {
  firstName: {
    type: String,
    required: true,
  }, // String, required
  lastName: {
    type: String,
    required: true,
  },  // String, required
  age: {
    type: Number,
    min: 1,
    max: 120,
    required: true,
  }, // Number, required, should be an integer between 1 and 120
  createdOn: {
    type: Date,
    default: Date.now,
  } // Date, required, defaults to current date
};

const friendSchema = new mongoose.Schema(definition);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;
