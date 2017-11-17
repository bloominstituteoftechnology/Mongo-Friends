const mongoose = require("mongoose");
//Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);
