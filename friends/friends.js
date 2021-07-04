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
        },
        contactInfo:{
            email:{
                type:String,
                default:"N/A"
            },
            mobile:{
                type:String,
                default:"N/A"
            },
            number:{
                type:String,
                default:"N/A"
            },
            github_username:{
                type:String,
                default:"N/A"
            },
            facebook_username:{
                type:String,
                default:"N/A"
            },
            twitter_handle:{
                type:String,
                default:"N/A"
            },

        }

}
const options ={
    timestamp:true,
}
const friendsSchema = new mongoose.Schema(defintion,options)

const friends = mongoose.model('Friend', friendsSchema, 'friends')

module.exports = friends;

