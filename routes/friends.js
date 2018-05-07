const express = require('express');
const router = express.Router();
const Friends = require('../data/Friends');

router
    .route('/')
    .get(get)
    .post(post);

function get(req, res) {
    Friends.find().then(friends => {
        res.status(200).json(friends);
    });
}

function post(req, res) {
    const newFriend = req.body;
    const friend = new Friends(newFriend);

    friend
        .save()
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

module.exports = router;