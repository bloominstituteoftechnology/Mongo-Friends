const router = require('express').Router();

const Friend = require('./friendModel');

//============GET===============
router.get('/', (req, res) => {
    Friend
    .find()
    .then(friends => {
        res.status(200).json(friends)
    })
    .catch(err => {
        res.status(500).json({ error:'Error Getting Friends!' })
    })
})

module.exports = router;