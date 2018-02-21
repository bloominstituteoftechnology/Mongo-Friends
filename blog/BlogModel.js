const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    }
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel