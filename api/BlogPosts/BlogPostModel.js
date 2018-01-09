import UserModel from '../Users/UserModel.js'
const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
     },
    content: { 
        type: String, 
        required: true,
     },
    // slug: { type: 'String', required: true },
    // cuid: { type: 'String', required: true },
    dateAdded: { 
        type: Date, 
        default: Date.now, 
        required: true, 
    },
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

modut.exports = BlogPost;