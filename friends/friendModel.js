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
    min: 1,
    max: 120,
    default: 1,
    required: true
  }
});

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;