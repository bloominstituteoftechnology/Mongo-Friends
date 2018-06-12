const mongoose = require('mongoose');

// Schema: Model || Like React Proptypes
// Capitalize types

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // Vaildates
        required: true
    },
    lastName: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        minlength: 1,
        maxlength: 120,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid age!'
        },
        required: [true, 'Friend age required']
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
});

const friendModel = mongoose.model('Friend', FriendSchema);

// Export
module.exports = friendModel;