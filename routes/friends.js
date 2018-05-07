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
          res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
        else if (err.name === "ValidationError")
          res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        else
          res.status(500).json({ errorMessage: "The new friend could not be added." });
      });
  });

router
  .route('/:id')
  .get((req, res) => { /* GET */
    Friend
    .findById(req.params.id)
    .then(friend => res.status(200).json(friend))
    .catch(err => {
      if (err.kind === "ObjectId")
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
    });
  })
  .delete((req, res) => { /* DELETE */
    Friend
    .findByIdAndRemove(req.params.id)
    .then(friend => res.status(200).json(friend))
    .catch(err => {
      if (err.kind === "ObjectId")
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      res.status(500).json({ errorMessage: "The friend could not be removed" });
    });
  })
  .put((req, res) => { /* PUT */
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) 
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    else if (isNaN(age) || age < 1 || age > 120)
      res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
    Friend
    .findByIdAndUpdate(req.params.id, { firstName, lastName, age })
    .then(friend => res.status(200).json(friend))
    .catch(err => {
      if (err.kind === "ObjectId")
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      res.status(500).json({ errorMessage: "The friend information could not be modified." });
    });
  });

module.exports = router;