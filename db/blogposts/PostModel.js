const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    blogger: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;