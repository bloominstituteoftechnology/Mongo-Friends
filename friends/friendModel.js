const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
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
        },
    
    
});

const options = {
    timestamps: true,
};


const friendModel = mongoose.model('Friend', FriendSchema);


module.exports = friendModel;