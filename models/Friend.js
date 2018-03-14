/* eslint-disable */

//importing mongoose and initializing the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
        max: 120,
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date(),
    }
})

module.exports = mongoose.model("Friends_Collection", FriendSchema);