const router = require('express').Router();

const Friend = require('./friendModel');

router 
    .route('/')
    .get((req, res) => {
        Friend.find({})
              .then(friends => {
                  res.status(200).json(friends);
              })
              .catch(err => {
                  res.status(500).json(err);
              });
    })
        .post((req, res) => {
            
            console.log('body', req.body);
            
            const friend = new Friend(req.body);

            console.log('friend', friend);

            friend
                .save()
                .then(savedFriend => {
                    res.status(201).json(savedFriend);
                })
                .catch(err => res.status(500).json(err));
    });

router 
    .route('/:id')
    .get((req, res) => {
        Friend.findById(req.params.id)
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })
    .delete((req, res) => {
        Friend.findByIdAndRemove(req.params.id)
            .then(deleteFriend => {
                res.status(200).json(deleteFriend);
    })
    .catch(error => {
        res.status(500).json(err);
    });
})
    .put((req, res) => {
        Friend.findByIdAndUpdate(req.params.id, { $set: { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
        }})
            .then(updateFriend => {
                res.status(200).json(updateFriend);
            })
            .catch(error => {
                res.status(500).json(err);
            });
    });

    
        

module.exports = router;