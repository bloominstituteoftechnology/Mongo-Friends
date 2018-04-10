const router = require('express').Router();
const friend = require('./friendsModel');
router
.route('/')
.get((req,res) =>{
    friend.find({})
    .then(friends =>{
        res.status(200).json(friends);
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The friends information could not be retrieved.' })
    });
})

.post((req, res) =>{
    const friend = new Friend(req.body);
    friend.save()
.then(addedFriend =>{
    if(req.body !== firstName&& lastName&&age){
        
    }
        res.status(201).json(addedFriend);
    })
    .catch(err =>res.status(500).json(err));
})
module.exports = router;