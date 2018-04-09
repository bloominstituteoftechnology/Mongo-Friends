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
            res.status(500).json(err);
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
// router
//   .route('/:id')
//   .get((req, res) => {
//     res.status(200).json({ route: '/api/friends/' + req.params.id });
//   })
//   .delete((req, res) => {
//     res.status(200).json({ status: 'please implement DELETE functionality' });
//   })
//   .put((req, res) => {
//     res.status(200).json({ status: 'please implement PUT functionality' });
//   });

module.exports = router;