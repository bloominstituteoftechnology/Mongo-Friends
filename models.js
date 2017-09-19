const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {type: String},
});

const PostSchema = new mongoose.Schema({
    title: {type: String},
    contents: {type: String},
    createdAt: {type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

module.exports = { User, Post };