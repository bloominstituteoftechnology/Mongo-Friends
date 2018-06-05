const router = require('express').Router();
const Friend = require('./friendModel.js');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(response=> {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        newFriend
            .save()
            .then(response => {
                res.status(201).json({ success: "New Friend Added", response});
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })
router
    .route('/:id')
    .get((req, res) => {
        Friend
            .findById(req.params.id)
            .then(response => {
                if(response === null) {
                    res.status(404).json({ error: "No Friend with that ID" })
                } else {
                    res.status(200).json(response)
                }
            })
            .catch(error => {
                res.status(500).json(error)
            })
    })
    .delete((req, res) => {
        Friend
            .findByIdAndRemove(req.params.id)
            .then(reponse => {
                if(response === null) {
                    res.status(404).json({ error: "No Friend with that ID"})
                } else {
                    res.status(201).json({ success: "Friend Removed", resource: response })
                }
            })
            .catch(error => {
                res.status(500).json(error)
            })
    })




module.exports = router;
