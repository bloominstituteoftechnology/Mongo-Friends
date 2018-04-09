const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,        
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
    },
    contactInfo: {
        email: {
            type: String,
            lowercase: true,
            required: true,
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], 
            // or import and use a validator
        },
        phone: {
            mobile: {
                type: Number,
                min: 10,
                max: 10,
            },
            home: {
                type: Number,
                min: 10,
                max: 10,
            },
        },
        usernames: {
            github: {
                type: String,
            },
            facebook: {
                type: String,
            },
            twitter: {
                type: String,
            }
        },
    },
    createdOn: {
        type: Date,        
        required: true,
        default: Date.now,
    }
})

const friendsModel = mongoose.model('Friends', friendsSchema); //creates friends collection

module.exports = friendsModel;