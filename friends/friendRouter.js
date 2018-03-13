const express = require('express');
const mongoose = require('mongoose');
const friendModels = require('./friendModels');

const FriendModel = mongoose.model('Friend');

const friendRouter = express.Router();

// '/api/friends
friendRouter.post('/', (req, res) => {
  const info = req.body;
  if (!info.firstName || !info.lastName || !info.age)
    res.status(400).json({
      errorMessage:
        'Please provide firstName, lastName and age for the friend.',
    });
  else if (info.age !== Math.round(info.age) || info.age < 1 || info.age > 120)
    res
      .status(400)
      .json({ errorMessage: 'Age must be a whole number between 1 and 120.' });
  else {
    const friend = new FriendModel(info);
    friend
      .save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the friend to the database',
        });
      });
  }
});

friendRouter.get('/', (req, res) => {
  FriendModel.find({})
    .then(friends => res.status(200).json(friends))
    .catch(err =>
      res.status(500).json({ error: 'The information could not be retrieved.' })
    );
});

friendRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  FriendModel.findById(id)
    .then(friend => {
      if (!friend)
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
      else res.status(200).json(friend);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

friendRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  FriendModel.findByIdAndRemove(id)
    .then(friend => {
      if (!friend)
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
      else res.status(200).json(friend);
    })
    .catch(err =>
      res.status(500).json({ error: 'The friend could not be removed' })
    );
});

friendRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const info = req.body;
  if (!info.firstName || !info.lastName || !info.age)
    res.status(400).json({
      errorMessage:
        'Please provide firstName, lastName and age for the friend.',
    });
  else {
    FriendModel.findByIdAndUpdate(id, info, { new: true })
      .then(friend => {
        if (!friend)
          res.status(404).send({
            message: 'The friend with the specified ID does not exist.',
          });
        else res.status(200).send(info);
      })
      .catch(err =>
        res
          .status(500)
          .send({ error: 'The friend information could not be modified.' })
      );
  }
});

module.exports = friendRouter;
