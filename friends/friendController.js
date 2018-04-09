const router = require('express').Router();
const Friend = require('./friendModel');

// /api/friends
router
.route('/')
.get((req,res)=>{
    Friend.find({})
    .then(friends=>{
        res.status(200).json({friends});
        })
    .catch(err=>{
        res.status(500).json(err);
        })
    })
.post((req,res)=>{
    const friend = new Friend(req.body);
    friend.save().then(savedFriend=>{
        res.status(201).json(savedFriend);
        })
    .catch(err=>{
        res.status(500).json(err);
        });
});


module.exports = router;

