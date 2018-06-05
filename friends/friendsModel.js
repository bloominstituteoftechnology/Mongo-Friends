const mongoose = required('mongoose');

const FriendSchemea = new.mongoose.Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: Stirng,
       required: true
   },
   age {
       type: Number,
       required: true
   },
   createdOn: {
       type: Date,
       reqired: true,
       default: Date.now()
   },
})

