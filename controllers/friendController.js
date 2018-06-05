const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
       Friend.find()
        .then(friends => {
            res.status(200).json(friend);
        })
        .catch(err => res.status(500).json({error: 'Error fetching friends'}))
    })

    module.exports = router;