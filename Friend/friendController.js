const router = require('express').Router();

const FriendModel = require('./FriendModel');

const friends = require('./FriendModel');

// api/friends
router
  .route('/')
    .get((req, res) => {
      friends.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
      })
    })
    .post((req, res) => {
      const { id, firstName, lastName, age } = req.body;

      const friends = new FriendModel(req.body);

      if (!firstName || !lastName || !age) {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
      } else {
        if (age < 1 && age > 120 ) {
          res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
        } else {
      friends
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(err => {
          res.status(500).json(err);
        });
      }};
  })
  router
  .route('/:id')
    .get((req, res) => {
      const { id } = req.body;
      friends.findById(req.params.id)
      .then(friends => {
        if (friends === null) {
          res.status(404).json({ message: "The friend with the specified ID does not exist." });
        } else {
          res.status(200).json(friends);
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
      })
    })
    .delete((req, res) => {
      const { id } = req.params;
      friends.findByIdAndRemove(id)
        .then(response => {
          if (response === null) {
            res.status(404).json({ message: "The friend with the specified ID does not exist." });
          } else {
            res.status(200).json(response);
          }
        })
        .catch(err => {
          if (err.name === 'CastError') {
            res.status(400).json({ message: 'The id provided is invalid, please check and try again.' });
          } else {
            res.status(500).json({ errorMessage: 'The friend could not be removed', err });
          }
        });
    })
    .put((req, res) => {
      friends.findByIdAndUpdate(req.params.id, req.body)
        .then(response => {
          if (response === null) {
            res.status(404).json({ message: 'not found' });
          } else {
            res.status(200).json(response);
          }
        })
        .catch(err => {
          if (err.name === 'CastError') {
            res.status(400).json({  message: 'The id provided is invalid, please check and try again.' });
          } else {
            res.status(500).json({ errorMessage: 'The friend could not be removed', err });
          }
        });
    });

  module.exports = router;
