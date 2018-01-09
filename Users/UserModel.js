const mongoose = require( 'mongoose');

const UserSchema= new mongoose.Schema ({
username:{
    type: String,
    required: true
},
dateOfBirth:{
    type: Date,
    required: true
}
});

const UserModel = mongoose.model('User', UserSchema);

module.export = UserModel;
