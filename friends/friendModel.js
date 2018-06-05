const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,

    },

    age: {
            type: Number,
            required: true,

    },
     createdOn: {
            type: Date,
            default: Date.now,
        },
    
    
});

const options = {
    timestamps: true,
};

// const friendSchema = new mongoose.Schema(options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');


module.exports = friendModel;