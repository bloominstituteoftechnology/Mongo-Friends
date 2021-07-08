const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

const friendModel = mongoose.model('Friend', friendSchema); // friends collection

module.exports = friendModel;