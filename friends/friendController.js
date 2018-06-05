const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then(friends => {
                res.status(200).json({ success: 'Friend found.' });
            })
            .catch(err => {
                res.status(500).json({ error: 'The friends information could not be retrieved.' })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        
    })

module.exports = router;