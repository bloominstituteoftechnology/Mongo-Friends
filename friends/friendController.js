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
                res.status(500).json({ error: error })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        newFriend
            .save()
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                res.status(500).json({ error: error });
            })
    })

module.exports = router;
