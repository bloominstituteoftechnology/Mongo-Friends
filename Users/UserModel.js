const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        lastname:{
            type: String,
            required : true
        },
        firstname:{
            type: String,
            required : true
        },
        age:{
            type : Number,
            required: true
        }
    }
)

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel