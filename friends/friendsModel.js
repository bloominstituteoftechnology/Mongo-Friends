const mongoose = require("mongoose");

const definition = {
    firstName: {
        type: String,
        required: true,
        unique: true,
    } , // String, required
    lastName: {
        type: String,
        required: true,
    } ,  // String, required
    age: {
        type: Number,
        required: true,

    } , // Number, required, should be an integer between 1 and 120
    createdOn: {
        type: Date,
        default: Date.now
    }, // Date, required, defaults to current date
    contactInfo: {
        email: {
            type: String,
            required: false,
        },
        number: {
            type: Number,
            required: false,
        },
        githubUsername: {
            type: String,
            required: false,
        },
        facebookUsername: {
            type: String,
            required: false,
        },
        twitterHanadle: {
            type: String,
            required: false,
        },
        snapchat: {
            type: String,
            required: false,
        }
    }
}

const options = {
    timestamps: true,
}

const friendSchema = new mongoose.Schema(definition, options)

const friendsModel = mongoose.model("Friend", friendSchema, "friends");
module.exports = friendsModel;