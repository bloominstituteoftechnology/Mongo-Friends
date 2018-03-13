const express = require('express');
const mongoose = require('mongoose');
const Friend = require('../friendModel/friendModel.js');

const friendRouter = express.Router();

friendRouter.post('/', function(req, res) {
  const friendInfo = req.body;
  const friend = new Friend(friendInfo);

  friend.save()
    .then(inputFriend => {
      res.status(201).json(inputFriend);
    })
    .catch(err => {
      if (err.errors.age) {
        res.status(400).json({ errorMessage: err.errors.age.message }).end();
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." }).end();
      } else {
        res.status(500).json({ error: "There was an error while saving the friend to the database" }).end();
      }
    });
});

friendRouter.get('/', function(req, res) {
  Friend.find({})
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." }).end();
    });
});

friendRouter.get('/:id', function(req, res) {
  const friendId = { _id: req.params.id };
  Friend.findById(friendId)
    .then(friend => {
      res.status(200).json(friend)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The information could not be retrieved." }).end();
      }
    });
});

friendRouter.put('/:id', function(req, res) {
  const friendId = { _id: req.params.id };
  const updateFriend = req.body;
  Friend.findByIdAndUpdate(friendId, updateFriend, { new: true } )
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      } else if (err.errors.age) {
        res.status(400).json({ errorMessage: err.errors.age.message }).end();
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." }).end();
      } else {
        res.status(500).json({ error: "The friend information could not be modified." }).end();
      }
    });
});

friendRouter.delete('/:id', function(req, res) {
  const friendId = { _id: req.params.id };
  Friend.findByIdAndRemove(friendId)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The friend could not be removed" }).end();
      }
    });
});

module.exports = friendRouter;
