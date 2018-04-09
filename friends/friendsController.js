const router = require('express').Router();

const Friends = require('./friendsModel');

// Routes for /api/friends
router
    .route('/')
    .get((req, res) => {
        Friends.find({})
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => {
            res.status(500).json({ err: 'There was an error getting your friends' });
        })
    })
    .post((req, res) => {
        console.log('body', req.body);
        const friends = new Friends(req.body);
        console.log('friends', friends);

        friends
        .save()
            .then(savedFriends => {
                res.status(201).json(savedFriends);
            })
            .catch(err => {
                res.status(500).json(err)
            });
    });

     //anything that needs an id
router
    .route('/:id')
    .get((req, res) => {
        Friends.findById(req.params.id)
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => {
            res.status(500).json({ err: 'No user friend found at => /api/friends/' + req.params.id });
        });
  })
    .delete((req, res) => {
        Friends.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({ message: 'This Friend has been removed!' });
        })
        .catch(err => {
            res.status(500).json({ err: 'There was an error deleting this friend' });
        });
  })
    .put((req, res) => {
        console.log('body', req.body)
        const friends = new Friends(req.body);
        console.log('friends', friends);

        Friends
        .findByIdAndUpdate(req.params.id, req.body)
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => {
            res.status(500).json({ err: 'There was an error updating this friend' });
        });
  });

module.exports = router;