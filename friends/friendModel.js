const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now,
	}
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
