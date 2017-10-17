const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('BlogPost', PostSchema);