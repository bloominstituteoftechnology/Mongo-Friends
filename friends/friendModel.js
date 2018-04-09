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
  }
});

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;