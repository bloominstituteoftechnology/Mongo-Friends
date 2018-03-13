const express = require('express');
const friendRouter = express.Router();
// const Friend = require('./FriendModel');

friendRouter.get('/', function(req, res) {
  res.status(200).json({ message: `Your Router Ain't Fucked Up`});
});

module.exports = friendRouter;
