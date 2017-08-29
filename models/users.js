const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName   : String,
    lastName    : String,
    createdAt: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);