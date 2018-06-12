const mongoose = require( 'mongoose' );


const FriendsSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    }
} )

const friendsModel = mongoose.model( 'Friend', FriendsSchema );

module.exports = friendsModel;
