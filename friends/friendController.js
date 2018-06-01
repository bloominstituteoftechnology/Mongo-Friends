const router = require('express').Router();

const Friend = require('./friendSchema');

router.route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
            })
    })
    .post((req, res) => {
        const friendData = req.body;
        const friend = new Friend(friendData);
        console.log(req.body);
        if (!req.body.firstName || !req.body.lastName || !req.body.age) {
            res.status(400).json({ error: "firstName, lastName, and age are required!"});
            return;
        }

        friend
            .save()
            .then(friend => {
                res.status(201).json(friend)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
            });
    });

router.route('/:id')
    .get((req, res) => {
        const friendId = req.params.id;

        Friend.findById(friendId)
            .then(friend => {
                if (friend !== null) {
                    res.status(200).json(friend);
                } else {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
            })
    })
    .delete((req, res) => {
        const friendId = req.params.id;

        Friend.findByIdAndRemove(friendId)
            .then(deleted => {
                if (deleted !== null) {
                    res.status(200).json(deleted)
                } else {
                    return res.status(404).json({ message: "The friend with that ID does not exist" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend could not be removed" })
            })
    })
    .put((req, res) => {
        const friendId = req.params.id;
        const friendData = req.body;
        const options = {
            new: true,
        }

        Friend.findByIdAndUpdate(friendId, friendData, options)
            .then(friend => {
                if (friend.firstName === "" || friend.lastName === "" || friend.age === "") {
                    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
                } else if (friend !== null) {
                    res.status(200).json(friend);
                } else {
                    res.sendStatus(404).json({ message: "The friend with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    });

module.exports = router;