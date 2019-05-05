const express = require('express');

const router = express.Router();

const Friend = require('./friendModel.js');

router
  .route('/')

  .get((req, res) => {
    Friend.find()
      .then(friends => res.json(friends))
      .catch(err =>
        res.status(500).json({
          errorMessage: 'The friends information could not be retrieved.',
        })
      );
  })

  .post((req, res) => {
    const newFriend = req.body;
    const { firstName, lastName, age } = newFriend;

    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.',
      });
    } else if (age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a number between 1 and 120' });
    } else {
      Friend.create(newFriend)
        .then(response => res.status(201).json(response))
        .catch(err =>
          res.status(500).json({
            errorMessage:
              'There was an error while saving the friend to the database.',
          })
        );
    }
  });

router
  .route('/:id')

  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.',
          });
        } else {
          res.json(friend);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(422).json({
            message: 'Invalid ID entered.',
          });
        } else {
          res.status(500).json({
            errorMessage: 'The friend information could not be retrieved.',
          });
        }
      });
  })

  .put((req, res) => {
    const { id } = req.params;
    const updateInfo = req.body;
    const { age } = updateInfo;

    if (age && (age < 1 || age > 120)) {
      res.status(400).json({ message: 'Age must be between 1 and 120.' });
    } else {
      Friend.findByIdAndUpdate(id, updateInfo)
        .then(response => {
          if (response === null) {
            res.status(404).json({
              message: 'The friend with the specified ID does not exist.',
            });
          } else {
            Friend.findById(response._id)
              .then(updated => res.json(updated))
              .catch(err => res.status(500).json(err));
          }
        })
        .catch(err => {
          if (err.name === 'CastError') {
            res.status(400).json({ message: 'Invalid ID entered.' });
          } else {
            res
              .status(500)
              .json({
                errorMessage: 'The friend information could not be modified.',
              });
          }
        });
    }
  })

  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.',
          });
        } else {
          res.json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(422).json({ errorMessage: 'Invalid ID entered' });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The friend could not be removed' });
        }
      });
  });

module.exports = router;
