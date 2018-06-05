const mongoose = require('mongoose');

const localHost = 'localhost:27017';
const database = 'frienddb';
mongoose
    .connect(`mongodb://${localHost}/${database}`)
    .then(response => {
        console.log("Connection Successful")
    })
    .catch(error => {
        console.log("Connection Failed")
    });

const FriendSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true }, // should be an integer between 1 and 120
    createdOn: { type: Date, required: true, default: Date.now() }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;
