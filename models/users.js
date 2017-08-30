const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id: Number,
    firstName   : String,
    lastName    : String,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'blogPost'
    }],
    createdAt: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);