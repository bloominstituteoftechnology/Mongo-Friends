const mongoose = require('mongoose');

const schema = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const options = {
    timestamps: true 
};

const FriendSchema = new mongoose.Schema(schema, options);

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel;