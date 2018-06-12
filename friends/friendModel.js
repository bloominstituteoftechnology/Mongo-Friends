const mongoose = require( 'mongoose' );


const friendsSchema = mongoose.Schema( {

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: string,
        required: true,
    },
    createOn: {
        type: Date,
        required: true,
        default: Date.now()
    }
} )
    
const friendModel = mongoose.model( 'friend', friendSchema );
exports = friendModel;
