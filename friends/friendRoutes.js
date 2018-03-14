const express = require('express');
const Friend = require('./friendModel.js');

const friendRouter = express.Router();

friendRouter.get('/', (req, res) => {
    Friend.find({})
        .then(friends => {
            res.status(200).send(friends);
        })
        .catch(err => res.status(400).send({
            error: `The information could not be retrieved. ${err}`
        }));
});

module.exports = friendRouter;