const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true
    },

    age: {
        type: number,
        required: true,
    },

    createdOn: {
       type: Date,
       default: Date.now() 
    }
})

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel;