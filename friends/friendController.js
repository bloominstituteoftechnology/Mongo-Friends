const router = require('express').Router();

const Friend = require('./friendModel.js');

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: 'The friends information could not be retrieved.'
        });
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.'
      });
    } else if (age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a number between 1 and 120' });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json({ savedFriend });
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });

module.exports = router;
