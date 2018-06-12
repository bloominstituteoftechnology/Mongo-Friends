const router = require('express').Router();
const Friend = require('./friendModel');

const errorMessage = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
};

router
// GET (/api/friends)
    .route('/')
    .get((req, res) =>
        Friend
        .find()
        .then(friends => {
            res.status(200).json({ friends })
        })
        // Retrieval Error from Database
        .catch(err => {
            res.status(500).json({ errorMessage: 'Information could not be retrieved.' })
        })

// GET (by id, /api/friends/:id)
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
    Friend
        .findById(id)
        .then(foundFriend => {
        // Specified ID Not Found
        if (!foundFriend) {
            res.status(404).json({ errorMessage: 'Specified ID does not exist.' })
        }
        res.status(200).json(friends);
    })
    // Retrieval Error from Database
    .catch(err => {
        res.status(500).json({ errorMessage: 'Could not be retrieved.' })
    });

// POST
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend ({ firstName, lastName, age });

        if(!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: 'Please provide your information.' })
        }
        if(age < 1 || age > 120) {
            res.status(400).json({ errorMessage: 'Please enter age between 1 to 120.' })
        }

        newFriend
            .save()
            .then(newFriend => {
                res.status(201).json({ newFriend })
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'Something went wrong.' })
            })
        })

        .delete((rew, res) => {
            const { id } = req.params;
            Friend
                .findByIdAndRemove(id)
                .then(deletedFriend => {
                    if(!deletedFriend => {
                        errorMessag(404, 'No friend with this id found.' , res);
                    }
                    res.status({ deletedFriend })
                })
                .catch(error => {
                    errorMessage(500, 'Something went wrong with the server.', res);
                })
            })
                });
