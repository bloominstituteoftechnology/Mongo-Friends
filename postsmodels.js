const mongoose = require('mongoose');

const BlogPosts = new mongoose.Schema ({
    blog: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', BlogPosts);