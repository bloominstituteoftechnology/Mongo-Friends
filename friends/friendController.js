const router = require('express').Router();
const Friend = require('./friendModel');

router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .get(getid)

// GET (/api/friends)
function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    })
    // Retrieval Error from Database
    .catch(err => {
        res.status(500).json({ errorMessage: "Information could not be retrieved" })
    });
}

// GET (by id, /api/friends/:id)
function getid(req, res) {
    const id = req.params.id;

    Friend
    .findById(id)
    .then(friends => {
        // Specified ID Not Found
        if (friends.length === 0) {
            res.status(404).json({ message: "Specified ID does not exist." })
        }
        res.status(200).json(friends);
    })
    // Retrieval Error from Database
    .catch(err => {
        res.status(500).json({ errorMessage: "Could not be retrieved." })
    });
}

