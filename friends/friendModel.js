const mongoose = require('mongoose');

const definition = {
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
        required: true,
        minlength: 1,
        maxlength: 120
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
    //STRETCH for contactInfo
    contactInfo: {
        Email: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        gitHub: {
            type: String
        },
        userName: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
    },
};

const options = {
    timestamps: true,
}; 

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

//export
module.exports = friendModel;