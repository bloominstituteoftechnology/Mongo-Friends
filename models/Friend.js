const mongoose = require("mongoose");

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
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    contactInfo: {
        email: [String],
        tel: [Number],
        github: String,
        facebook: String,
        twitter: String
    }
});

const friendsModel = mongoose.model("Friend", FriendSchema);

module.exports = friendsModel;