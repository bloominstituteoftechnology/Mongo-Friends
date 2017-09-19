const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String
});

module.exports = mongoose.model('Users', UserSchema);