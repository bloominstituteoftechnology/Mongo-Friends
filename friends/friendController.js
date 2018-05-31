const router = require('express').Router();

const Friend = require('./friendSchema');

router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .get((req, res) => {
        Friend.find({ _id: req.params.id })
            .then(friend => {
                res.status(404).json({ friend });
            })
            .catch(err => {
                console.log(err);
                if (err.name === 'CastError') {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
                }
            });
    })
    .delete((req, res) => {
        Friend.remove({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ status: 'Deleted friend with ID: ' + req.params.id });
            })
            .catch(err => {
                console.log(err);
                if (err.name === 'CastError') {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend could not be removed" });
                }
            });
    })
    .put((req, res) => {
        Friend.where({ _id: req.params.id }).update({ $set: req.body })
            .then(() => {
                res.status(200).json({ status: 'Friend updated' });
            })
            .catch(err => {
                console.log(err);
                if (err.name === 'CastError') {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend information could not be modified." });
                };
            });
    });

function get(req, res) {
    Friend.find()
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
        })
}

function post(req, res) {
    const friendData = req.body;

    const friend = new Bear(friendData);

    friend
        .save()
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the friend to the database" });
        });
}

module.exports = router;