const router = require('express').Router();

const Friend = require('./Friend');

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    .get(getById)
    .put(put)
    .delete(destroy)
    
function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    });
}

function post(req, res) {
    const friendInfo = req.body;

    const friend = new Friend(friendInfo)

    friend
        .save()
        .then(friend => {
            Friend.find().then(friends => {
                res.status(200).json(friends);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getById(req, res) {
    const { id } = req.params;

    Friend
        .findById(id)
        .then(friends => {
        res.status(200).json(friends);
    });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Friend
        .findByIdAndUpdate(id, update)
        .then(friends => {
            Friend.find().then(friends => {
                res.status(200).json(friends);
            });
    });
}

// function put(req, res) {
//     const { id } = req.params;
//     const newInfo = req.body;

//     Friend
//         .findById(id)
//         .update(newInfo)
//         .then(friends => {
//         res.status(200).json(friends);
//     });
// }

// function destroy(req, res) {
//     const { id } = req.params;
    
//     Friend
//         .findById(id)
//         .remove()
//         .then(friends => {
//         res.status(200).json(friends);
//     });
// }

function destroy(req, res) {
    const { id } = req.params;
    
    Friend
        .findByIdAndRemove(id)
        .then(friends => {
            Friend.find().then(friends => {
                res.status(200).json(friends);
            });
    });
}

module.exports = router;