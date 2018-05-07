const router = require('express').Router();

const Friend = require('../models/Friend');

router
  .route('/')
  .get((req, res) => { /* GET */
    Friend
    .find()
    .then(friends => res.status(200).json(friends))
    .catch(err => {
      res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
    });
  })
  .post((req, res) => { /* POST */
    const friendData = req.body;
    const friend = new Friend(friendData);
    friend
      .save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        if (err.errors.age)
          res.status(500).json({ errorMessage: "Age must be a number between 1 and 120" });
        else if (err.name === "ValidationError")
          res.status(500).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        else
          res.status(500).json(err);
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

function post(req, res) {
  const friendData = req.body;

  const friend = new Friend(friendData);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;