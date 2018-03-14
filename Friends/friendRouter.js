const express = require('express');
const friendRouter = express.Router();

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
          errorMessage: 'Age must be a whole number between 1 and 120',
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

friendRouter.get('/', (req, res) => {
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

friendRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findById(id)
    .then(foundFriend => {
      res.status(STATUS_SUCCESS).json(foundFriend);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(STATUS_NOT_FOUND);
        res.send({ error: 'The information could not be retrieved.' });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({
          message: 'The friend with the specified ID does not exist.',
        });
      }
    });
});

friendRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  Friend.findByIdAndRemove(id)
    .then(enemy => {
      res.status(STATUS_SUCCESS).json(enemy);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(STATUS_NOT_FOUND);
        res.send({ error: 'The friend could not be removed' });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({
          message: 'The friend with the specified ID does not exist.',
        });
      }
    });
});

friendRouter.put('/:id', (req, res) => {
  const { id } = req.params;

  // const { age } = req.body;
  // if (Number.isInteger(age) || age < 1 || age > 120) {
  //   res
  //     .status(STATUS_USER_ERROR)
  //     .send('Age must be a whole number between 1 & 120.');
  //   return;
  // }

  Friend.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(updatedFriend => {
      res.status(STATUS_SUCCESS).json(updatedFriend);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(STATUS_NOT_FOUND);
        res.send({ error: 'The friend could not be removed' });
      } else if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST);
        res.send({
          errorMessage: 'Age must be a whole number between 1 and 120',
        });
      } else {
        res.status(STATUS_USER_ERROR);
        res.send({
          message: 'The friend with the specified ID does not exist.',
        });
      }
    });
});

module.exports = friendRouter;
