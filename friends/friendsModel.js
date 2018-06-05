const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number
    },
    github: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    }
})

const friendSchema = new mongoose.Schema({
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
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    contactInfo: contactSchema
});

const friendsModel = mongoose.model("Friend", friendSchema);

module.exports = friendsModel;