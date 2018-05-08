
const mongoose = require('mongoose');

const definition = {
    friend: {
        firstName: String,
        lastName: String,
        age: Int,
        createdOn: Date.now,
    }

    

};


const options = {
    timestamp: true,
}


const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;