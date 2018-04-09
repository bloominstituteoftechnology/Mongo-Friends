const router = require('express').Router();

const friendM = require('./friendModel.js');

router.route('/')
.get((req, res) => {
    friendM
    .find({})
    .then(friend => {
        res.status(200).json(friend)
    })
    .catch(error => {
        res.status(500).json({ error: 'Yea we didnt find any friends.'})
    })
})

.post((req, res) => {
    const newFriend = new friendM(req.body);

    newFriend
    .save()
    .then(newF => {
        res.status(200).json(newF)
    })
    .catch(error => {
        res.status(500).json({error: 'We couldnt make you a friend.'})
    })

});

router.route('/:id')
.get((req, res) => {
    friendM
    .findById(req.params.id)
        .then(friend => {
            res.status(200).json({ friend });
        })
        .catch(error => {
            res.status(500).json({error: 'That friend does not exist.'})
        })    
   
    })
    
.delete((req, res) => {
        friendM.findByIdAndRemove(req.params.id)
        .then(() => { 
            res.status(200).json({ status: 'If you close your eyes its like you actually deleted something.' })
        })
        .catch(error => {
            res.status(500).json({error: 'That friend will be with you forever.'})
        })
    })

.put((req, res) => {
    friendM.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ fuckyea: 'You updated that shit.'})
        })
        .catch(error => {
        res.status(200).json({ status: 'We have recieved your update, but chose not to do anything with it.' })
        })
    });

// router
// friendDb
//     .get((req, res) => {
//         res.status(200).json({ route: './api/friends'});
//     })
//     .post((req, res) => {
//         res.status(201).json({ status: 'We have recieved your post, but chose not to do anything with it.' })
//     });



module.exports = router;