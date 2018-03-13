const express = require('express');
const friendRouter = express.Router();
const Friend = require('../models/schema.js');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const STATUS_CREATED_SUCCESS = 201;
const STATUS_OK = 200;

friendRouter.post('/friends', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const checkAll = firstName && lastName && age;

  if (checkAll) {
    const friend = new Friend(req.body);
    console.log(friend);
    friend
      .save()
      .then((friend) => res.status(STATUS_CREATED_SUCCESS).json(friend))
      .catch((err) =>
        res.status(STATUS_BAD_REQUEST).json({ error: err.errors.age.message })
      );
  } else
    res.status(STATUS_BAD_REQUEST).json({
      errorMessage:
        'Please provide firstName, lastName and age for the friend.',
    });
});

friendRouter.get('/friends', (req, res) => {
  Friend.find({})
    .then((friends) => res.status(STATUS_OK).json(friends))
    .catch((err) =>
      res
        .status(STATUS_SERVER_ERROR)
        .json({ error: 'The information could not be retrieved.' })
    );
});

friendRouter.get('/friends/:id', (req, res) => {
  Friend.findById(req.params.id)
    .then((friend) => {
      console.log(friend);
      if (friend) res.status(STATUS_OK).json(friend);
      else
        res.status(STATUS_NOT_FOUND).json({
          message: 'The friend with the specified ID does not exist.',
        });
    })
    .catch((err) => {
      res
        .status(STATUS_SERVER_ERROR)
        .json({ error: 'The information could not be retrieved.' });
    });
});

friendRouter.delete('/friends/:id', (req, res) => {
  Friend.findByIdAndRemove(req.params.id)
    .then((friend) => {
      if (friend)
        res.status(STATUS_OK).json({
          Success: `The friend with id: ${req.params.id} was removed`,
        });
      else
        res.status(STATUS_NOT_FOUND).json({
          message: 'The friend with the specified ID does not exist.',
        });
    })
    .catch((err) =>
      res
        .status(STATUS_SERVER_ERROR)
        .json({ error: 'The friend could not be removed' })
    );
});

friendRouter.put('/friends/:id', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const checkAge = age && !isNaN(age) && age >= 1 && age <= 120;
  const checkAll = firstName && lastName && age;

  if (checkAll) {
    if (checkAge) {
      Friend.findByIdAndUpdate(req.params.id, req.body)
        .then((friend) => {
          if (friend) {
            Friend.findById(req.params.id)
              .then((friend) => {
                if (friend) res.status(STATUS_OK).json(friend);
                else {
                  res.status(STATUS_NOT_FOUND).json({
                    message: 'The friend with the specified ID does not exist.',
                  });
                }
              })
              .catch((err) => {
                res
                  .status(STATUS_SERVER_ERROR)
                  .json({ error: 'The information could not be retrieved.' });
              });
          } else
            res.status(STATUS_NOT_FOUND).json({
              message: 'The friend with the specified ID does not exist.',
            });
        })
        .catch((err) => {
          res.status(STATUS_SERVER_ERROR).json({
            errorMessage:
              'Please provide firstName, lastName and age for the friend.',
          });
        });
    } else
      res
        .status(STATUS_BAD_REQUEST)
        .json({ errorMessage: 'Age must be a whole number between 1 and 120' });
  } else
    res
      .status(STATUS_BAD_REQUEST)
      .json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.',
      });
});

module.exports = friendRouter;
