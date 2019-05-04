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
    required: true,
    minlength: 1,
    maxlength: 120,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const friendsModel = mongoose.model('friends', friendSchema);
module.exports = friendsModel;
