const router = require('express').Router();
const Friend = require('../database.js');

router
  .route('/')
  .get((req, res) => {

    Friend.find()
      .then(response => {
        res.status(200).json({ data: response })
      })
      .catch(err => res.status(500).json({ data: err }))
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body
    if (firstName && lastName && age) {
      if (typeof age !== 'number' || age > 120 || age < 0) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
      }
      else {
        Friend.create(req.body)
          .then(response => res.status(201).json({ data: response }))
          .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the friend to the database" }))
      }
    }
    else {
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    }
  });

router
  .route('/:id')
  .get((req, res) => {

    Friend.findById(req.params.id)
      .then(response => {
        if (response) {
          res.status(200).json({ data: response })
        }
        else {
          res.status(404).json({ message: "The friend with the specified ID does not exist." })
        }
      })
      .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the friend to the database" }))
  })
  .delete((req, res) => {

    Friend.findByIdAndDelete(req.params.id)
      .then(response => {
        if (response) {
          res.status(200).json({ data: response })
        }
        else {
          res.status(404).json({ message: "The friend with the specified ID does not exist." })
        }
      })
      .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the friend to the database" }))
  })
  .put((req, res) => {
    const { firstName, lastName, age } = req.body
    if (firstName && lastName && age) {
      if (typeof age !== 'number' || age > 120 || age < 0) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
      }
      else {

        Friend.findByIdAndUpdate(req.params.id, req.body)
          .then(response => {
            if (response) {
              res.status(200).json({ data: response })
            }
            else {
              res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }
          })
          .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" }))
      }
    }
    else {
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    }
  });

module.exports = router;
