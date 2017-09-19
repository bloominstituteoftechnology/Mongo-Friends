const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('blogPosts', blogSchema);