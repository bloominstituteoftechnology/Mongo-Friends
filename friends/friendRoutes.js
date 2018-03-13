const express = require('express');

const routes = (Friend) => {
  const friendRouter = express.Router();

  friendRouter.get('/friends', (req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ error: 'The information could not be retrieved.' });
      });
  });

  friendRouter.post('/friends', (req, res) => {
    const friend = new Friend(req.body);
    friend.save()
      .then(person => {
        res.status(201).json(person);
      })
      .catch(err => {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
      })
  });

  friendRouter.get('/friends/:id', (req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(500).json({ error: 'The information could not be retrieved.'});
      });
  });
  return friendRouter;
}

module.exports = routes;
