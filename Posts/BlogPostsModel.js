const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    posterId: {
        type: String,
        required: true,
    },
    postText: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const BlogPostModel = mongoose.model('User', BlogPostSchema);

module.exports = BlogPostModel;