const express = require('express');

const router = express.Router();

const Friend = require('./friendModel.js');

router
  .route('/')

  .get((req, res) => {
    Friend.find()
      .then(friends => res.json(friends))
      .catch(err => res.status(500).json(err));
  })

  .post((req, res) => {
    const newFriend = req.body;
    const { firstName, lastName, age } = newFriend;

    if (!firstName) {
      res.status(400).json({ message: 'A First Name is required.' });
    } else if (!lastName) {
      res.status(400).json({ message: 'A Last Name is required.' });
    } else if (age < 1 || age > 120) {
      res.status(400).json({ message: 'Age must be between 1 and 120.' });
    } else {
      Friend.create(newFriend)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err));
    }
  });

router
  .route('/:id')

  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({ message: 'Friend ID does not exist.' });
        } else {
          res.status(500).json(err);
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
          Friend.findById(response._id)
            .then(updated => res.json(updated))
            .catch(err => res.status(500).json(err));
        })
        .catch(err => {
          if (err.name === 'CastError') {
            res.status(400).json({ message: 'Friend ID does not exist.' });
          } else {
            res.status(500).json(err);
          }
        });
    }
  })

  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => res.json(response))
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({ message: 'Friend ID does not exist.' });
        } else {
          res.status(500).json(err);
        }
      });
  });

module.exports = router;
