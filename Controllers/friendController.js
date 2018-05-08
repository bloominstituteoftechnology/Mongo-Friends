const mongoose = require('mongoose');

const definition = {
    friend: {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 18,
        createdOn: Date.now,
    }

    

};


const options = {
    timestamp: true,
}


const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;