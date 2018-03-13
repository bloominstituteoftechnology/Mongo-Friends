
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Friends = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,

        },
        age: {
            type: Number,
            required: true,
        },
        createdOn: {
            type: Date,
            default: Date.now,
        }
    }
);
const FriendModel = mongoose.model('Friends', Friends);
module.exports = FriendModel; 