const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  age: {
  	type: Number,
  	required: true
  },
  createdOn: {
  	type: Date,
  	required: false,
  	default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
