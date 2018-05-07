const mongoose = require('mongoose');

const definition = {
    firstName: String,
    lastName: String,
    age: Number,
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const options = {
    timestamps: true
};

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;