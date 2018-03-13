const express = require('express');
const friendRouter = express.Router();
const Friend = require('./FriendModel');

friendRouter.post('/', function(req, res) {
  const friendInfo = req.body;
  const { firstName, lastName, age } = friendInfo;
  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
  }
  const friend = new Friend(friendInfo);
  friend.save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'There was an error while saving the friend to the database', err});
    });
});

module.exports = friendRouter;
