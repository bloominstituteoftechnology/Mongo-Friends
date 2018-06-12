
const mongoose = require('mongoose');

const definition = {
    
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true, 
        default: new Date()
    }
    

};


const options = {
    timestamp: true,
}


const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;