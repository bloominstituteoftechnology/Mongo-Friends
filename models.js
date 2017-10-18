const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	friends: {
		type: Array,
		// required: true,
		default: []
	}
})

const BlogPostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	contents: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	comments: {
		type: Array,
		default: []
	}
})

// module.exports = mongoose.model('User', UserSchema, 'users');
let User = mongoose.model('User', UserSchema, 'users');
// module.exports = mongoose.model('BlogPost', BlogPostSchema, 'blogPosts');
let BlogPost = mongoose.model('BlogPost', BlogPostSchema, 'blogPosts');

module.exports = { User, BlogPost };