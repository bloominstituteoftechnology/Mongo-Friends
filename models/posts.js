const mongoose = require('mongoose');

const User = require('./users.js')

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: String,
    _author: { 
        type: Number, 
        reference: 'User' 
    },
    createdAt: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);