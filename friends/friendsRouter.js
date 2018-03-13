const express = require('express');
const Friend = require('./friendsModel.js');
const friendsRouter = express.Router();

friendsRouter.get('/', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ err: 'The information cannot be retrieved' })
    })
})

module.exports = friendsRouter;
