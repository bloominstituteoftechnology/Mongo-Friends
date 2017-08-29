const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    firstName   : String,
    lastName    : String,
    blogPosts: {
        type: Number,
        ref: 'blogPost'
    },
    createdAt: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);