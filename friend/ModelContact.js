const mongoose = require('mongoose');

const definition = {
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: Number,
        required: false,
    },
    github_username: {
        type: String,
        required: false,
    },
    facebook_username: {
        type: String,
        required: false,
    },
    twitter_handle: {
        type: String,
        required: false,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
};


const options = {
    timestamps: true
};

const contactSchema = new mongoose.Schema(definition,  options);

const ModelContact = mongoose.model("Contact", contactSchema, "contacts");

module.exports = ModelContact;

