const router = require('express').Router();

const Friend = require('./Friend');

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    // .get(getById)
    // .put(put)
    // .delete(destroy)
function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    });
}

function post(req, res) {
    const friendInfo = req.body;

    const friend = new Friend(friendInfo)

    friend
        .save(friend)
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getById(req, res) {
    const { id } = req.params;

    Friend.find({id: id}).then(friends => {
        res.status(200).json(friends);
    });
}

function put(req, res) {
    const { id } = req.params;


}

module.exports = router;