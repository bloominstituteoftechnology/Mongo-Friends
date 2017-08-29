const mongoose = require('mongoose');

const author = require('./users.js')

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    author: { 
        type: Schema.Types.ObjectId, 
        reference: 'Users' 
    },
    createdAt: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('BlogPosts', BlogPostSchema);