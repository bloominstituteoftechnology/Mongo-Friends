/* eslint-disable */

//importing mongoose and initializing the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    firstName:{
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
        min: 1,
        max: 120,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("Friends_Collection", FriendSchema);