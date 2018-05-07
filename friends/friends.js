import { Mongoose } from 'mongoose';

const mongoode = require('mongoose');

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
            type: number,
            min:1,
            max: 120
        },
        createdOn:{
            type:date,
            required: date.now
        }
}
const options ={
    timestamp:true,
}
const friendsSchema = new Mongoose.Schema(definition,options)

const friends = mongoose.model('Friend', friendsSchema, 'friends')

module.exports = friends;

