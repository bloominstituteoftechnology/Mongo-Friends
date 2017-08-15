const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
	  type: String,
	},
	password: {
	  type: String,
	},
	createdAt: {
	  type: Date,
	  default: Date.now,
	},
});

module.exports = mongoose.model('User', UserSchema);
