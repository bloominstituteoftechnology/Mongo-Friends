

const mongoose = require('mongoose');

const BlogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('BlogPost', BlogpostSchema);