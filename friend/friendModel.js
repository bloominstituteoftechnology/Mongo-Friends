const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'You need a first name.']
    },
    lastName: {
        type: String,
        required: [true, 'You need a last name.']
    },
    age:{ 
        type: Number,
        required: [true, 'You need to have been born.'],
        min: [1, 'You are too young to have friends.'],
        max: [120, 'You are too old to have friends.']
    },
    createdOn: {type: Date, default: Date.now}
});

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;