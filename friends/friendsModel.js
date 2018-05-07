const mongoose = require('mongoose');

const definition = {
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
        // number: 1 || 120,
    }, 
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
};

const options = {
    timestamps: true
};

const friendsSchema = new moongoose.Schema(definition, options)

const friendsModel = mongoose.model('Friends', friendsSchema, 'friends')

module.exports = friendsModel;