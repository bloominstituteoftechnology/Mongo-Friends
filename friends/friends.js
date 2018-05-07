const mongoose = require('mongoose');

const defintion ={

    
        firstName:{
            type:String,
            required: true,
        },
        lastName: {
            type:String,
            required: true,
        },
        age: {
            type:Number,
            min:1,
            max: 120,
            required:true
        },
        createdOn:{
            type:Date,
            default: Date.now,
        }
}
const options ={
    timestamp:true,
}
const friendsSchema = new mongoose.Schema(defintion,options)

const friends = mongoose.model('Friend', friendsSchema, 'friends')

module.exports = friends;

