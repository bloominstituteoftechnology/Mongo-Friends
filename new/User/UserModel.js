const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);

module.exports = BearModel;