const mongoose = require('mongoose');

const author = require('./users.js')

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    content: String,
    author: { 
        type: Schema.Types.ObjectId, 
        reference: 'User' 
    },
    createdAt: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('BlogPosts', BlogPostSchema);