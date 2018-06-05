const router = require('express').Router();
const Friend = require('./friendModel.js');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(response=> {
                res.status(200).json({ data: response })
            })
            .catch(error => {
                res.status(500).json({ error: "error" })
            })
    })

module.exports = router;
