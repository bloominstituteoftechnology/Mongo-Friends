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
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'The friends information could not be retrieved '});
    })
}

function post(req, res) {
    const { firstName, lastName, age } = req.body;
    const newFriend = { firstName, lastName, age };
    const friend = new Friends(newFriend);
    if(!firstName || !lastName || !age) {
        res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
    } else if(Number.isNaN(age) || (age < 1 || age > 120) ) {
        res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120' });
    } else {
    friend
        .save()
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error while saving the friend to the database '});
        });
    }
}

module.exports = router;