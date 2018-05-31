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

// what is this line doing?
const FriendSchema = new mongoose.Schema(schema, options);
// and what is this line doing? what's the connection between
// lines 29 and 32? 
const friendModel = mongoose.model('Friend', FriendSchema);

