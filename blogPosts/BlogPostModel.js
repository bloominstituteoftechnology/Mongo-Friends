const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now,
	}
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;
