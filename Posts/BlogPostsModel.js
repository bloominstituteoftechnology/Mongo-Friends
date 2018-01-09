const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        text:{
            type:String,
            required: true,
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now()
        },
        author:{
            type:String,
            required: false,
        }
    }
) 
module.exports = mongoose.model('Post', PostSchema)