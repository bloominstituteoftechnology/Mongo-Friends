const mongoose = require('mongoose');
const integerValidator = require('mongoose-integer');

const friendSchema = new mongoose.Schema({
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
        integer: true,
        min: 1,
        max: 120,    
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

friendSchema.plugin(integerValidator);

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;