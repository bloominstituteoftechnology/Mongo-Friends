const mongoose = require('mongoose');
const BlogPost = require('../Posts/PostModel.js');
const ObjectId = mongoose.Schema.Types.ObjectId;

const FriendSchema = new mongoose.Schema({
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
	},
	createdOn: {
		type: Date,
		required: true,
		default: Date.now
	},
	posts: [
		{
			type: ObjectId,
			ref: 'Post'
		}
	]
});

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel;
