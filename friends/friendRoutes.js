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
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
      })
  });

  friendRouter.get('/friends/:id', (req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        if (friend) {
          res.status(200).json(friend);
        } else {
          res.status(404).json({ message: 'The friend with the specified ID does not exist.', error: err });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'The information could not be retrieved.', error: err });
      });
  });

  friendRouter.put('/friends/:id', (req, res) => {
    const { id } = req.params;
    const friendData = req.body
    Friend.findByIdAndUpdate(id, friendData)
      .then(friend => {
        if (friend) {
          res.status(200).json(friend);
        } else {
          res.status(404).json({ message: 'The friend with the specified ID does not exist.', error: err });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'The friend information could not be modified.', error: err });
      });
  });

  friendRouter.delete('/friends/:id', (req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
      .then(friend => {
        if (friend) {
          res.status(200).json(friend);
        } else {
          res.status(404).json({ message: 'The friend with the specified ID does not exist.', error: err });
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
        } else {
          res.status(500).json({ error: 'The friend information could not be modified.', error: err });
        }
      });
  });

  return friendRouter;
}

module.exports = routes;
