const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true, 
    }, 
    lastName: {
        type: String, 
        required: true,
        index: true,
    }, 
    age: {
        type: Number, 
        required: true, 
    }, 
    createdOn: {
        type: Date, 
        default: Date.now, 
    }, 
});

const FriendModel = mongoose.model('Friend', FriendSchema);
module.exports = FriendModel;