const Mongoose = require('mongoose')

const definition = {
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
        type: Number, min: 1, max: 120, 
        required: true, 

    },
    createdOn: {
        type: Date, 
        default: Date.now, 
    },
};

const options = {
    timestamps: true, 
}; 

const friendSchema = new Mongoose.Schema(definition, options); 

const friendModel = Mongoose.model('Friend', friendSchema, 'friends'); 

module.exports = friendModel; 