const mongoose = require("mongoose");

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
        // integer between 1 and 120?
        min: 1,
        max: 120,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const friendModel = mongoose.model("Friend", friendSchema);

module.exports = friendModel;