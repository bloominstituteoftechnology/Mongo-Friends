const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
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
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true
    },

    contact: {
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{4}-\d{4}-\d{8}/.test(v);
                },
                message: '{VALUE} is not a valid phone number!'
            },
            required: [true, 'User phone number required']
        },
        email: {
            type: String,
            required: false
        },
        ghUser: {
            type: String,
            required: false
        },
        facebookUser: {
            type: String,
            required: false
        }
    }
})

const friendModel = mongoose.model('Friend', FriendSchema)
module.exports = friendModel;