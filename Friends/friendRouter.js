const express = require('express');

const Friend = require('./models.js');

const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 500;

friendRouter.post('/', (req, res) => {
  const friendInfo = req.body;

  const friend = new Friend(friendInfo);

  friend
    .save()
    .then(savedFriend => {
      res.status(STATUS_CREATED);
      res.send(savedFriend);
    })
    .catch(err => {
      if (err.errors.age.kind === 'user defined') {
        res.status(STATUS_BAD_REQUEST);
        res.send({
          errorMessage:
            'Age must be a whole number between 1 and 120',
        });
      } else if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST);
        res.send({
          errorMessage:
            'Please provide firstName, lastName and age for the friend',
        });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({
          error: 'There was an error while saving the friend to the database.',
        });
      }
    });
});

friendRouter.get('/api/friends', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(STATUS_SUCCESS);
      res.send(friends);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

friendRouter.get('/api/friends/:id', (req, res) => {});

friendRouter.delete('/api/friends/:id', (req, res) => {});

friendRouter.put('/api/friends/:id', (req, res) => {});

module.exports = friendRouter;
