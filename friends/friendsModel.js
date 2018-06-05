const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: tue,
        unique: true 
    },
    lastName: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    }
});
const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;