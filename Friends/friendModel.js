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
    contactInfo: {
        email: {
          type: String
        },
        mobile: {
          type: Number
        },
        github: {
          type: String
        },
        facebook: {
          type: String
        },
        twitter: {
          type: String
        }
      }
};

const options = {
    timestamps: true, 
}; 

const friendSchema = new Mongoose.Schema(definition, options); 

const friendModel = Mongoose.model('Friend', friendSchema, 'friends'); 

module.exports = friendModel; 