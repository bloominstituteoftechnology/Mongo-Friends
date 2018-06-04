const router = require('express').Router();

const Friends = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friends.find()
            .then(friends => {
                res.json(friends);
            })
            .catch(error => {
                res.status(500).json({error: 'The friends information could not be retrieved.'})
            })
    })


    module.exports = router;