const express = require('express');
const mongoose = require('mongoose');
const Friend = require('../friendModel/friendModel.js');

const friendRouter = express.Router();

friendRouter.post('/api/friends', function(req, res) {
  const friendInfo = req.body;
  const friend = new Friend(friendInfo);

  friend.save()
    .then(inputFriend => {
      res.status(201).json(inputFriend);
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ errorMessage: "Change me" }).end();
      } else {
        res.status(500).json({ error: "Change me" }).end();
      }
    });
});

friendRouter.get('/api/friends', function(req, res) {
  Friend.find({})
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(err => {
      res.status(500).json({ error: "TChange me." }).end();
    });
});

friendRouter.get('/api/friends/:id', function(req, res) {
  const friendId = { _id: req.params.id };
  Friend.findById(friendId)
    .then(friend => {
      res.status(200).json(friend)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "TChange me." });
      } else {
        res.status(500).json({ error: "TChange me." }).end();
      }
    });
});

friendRouter.put('/api/friends/:id', function(req, res) {
  const friendId = { _id: req.params.id };
  const updateFriend = req.body;
  Friend.findByIdAndUpdate(friendId, updateFriend, { new: true } )
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "Change met." });
      } else {
        res.status(500).json({ error: "TChange med." }).end();
      }
    });
});

friendRouter.delete('/api/friends/:id', function(req, res) {
  const friendId = { _id: req.params.id };
  Friend.findByIdAndRemove(friendId)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "Change me." });
      } else {
        res.status(500).json({ error: "Change me" }).end();
      }
    });
});

module.exports = friendRouter;
