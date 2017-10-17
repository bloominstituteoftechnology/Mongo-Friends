const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	username: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Users', UsersSchema);