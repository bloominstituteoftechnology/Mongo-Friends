const router = require('express').Router();

const Friend = require('./friendsModel');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(friends => {
                if (req.age < 1 || req.age > 120) {
                    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
                }  
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
            });
    })

    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        newFriend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                res.status(422).json({ err: 'Error' });
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend
            .findById(id)
            .then(gotFriend => {
                res.status(200).json(gotFriend);
            })
            .catch(err => {
                res.status(404).json({ error: 'error' });
            })
    })

    .delete((req, res) => {
        const { id } = req.params;
        Friend
            .findByIdAndRemove(id)
            .then(friendRemoved => {
                res.status(200).json(friendRemoved);
            })
            .catch(err => {
                res.status(500).json({ status: "error status" });
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ firstName, lastName, age } = req.body);
        Friend
            .findByIdAndUpdate(id, updates, { firstName, lastName, age } = req.body)
            .then(friend => {
                res.json(friend);
            })
            .catch(err => {
                res.status(500).json({ status: 'error status' })
            })
    })

module.exports = router;