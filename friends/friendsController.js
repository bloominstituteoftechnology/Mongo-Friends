const router = require('express').Router();
const Friends = require('./friendsModel');

router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .get((req, res) => {
        res.status(200).json({ route: '/api/friends' + req.params.id });
    })
    .delete((req, res) => {
        res.status(200).json({ status: 'please implement DELETE functionality' });
    })
    .put((req, res) => {
        res.status(200).json({ status: 'please implement UPDATE functionality' });
    })

    function get(req, res) {
        res.status(200).json({ route: 'api/friends' });
    }

    function post(req, res) {
        const friendData = req.body;

        const friend = new Friends(friendData);

        friend.save().then(friend => {
            res.status(201).json(friend)
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }

    module.exports = router;