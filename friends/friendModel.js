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
        min: [1, 'too young to be a friend'],
        max: [120, 'too old to be a friend'],

    },
     createdOn: {
            type: Date,
            default: Date.now,
    },
    contactInfo: {
        email: {
            type: String
        },
        phoneNumber: {
            type: Number
        }
    }
    
    
});

const options = {
    timestamps: true,
};

// const friendSchema = new mongoose.Schema(options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');


module.exports = friendModel;