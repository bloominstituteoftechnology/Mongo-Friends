const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    githubUserName:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        pattern : "@lambdaschool\.com$",
        description: "must be a string and match the regular expression pattern",
    },
    contactInfo: [{
        githubUserName: String,
        email: String,
    }],
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

const friendsModel = mongoose.model('Friend', friendSchema);

module.exports = friendsModel;