const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend
      .find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
      })
  })

  .post((req, res) => {
    const friendData = req.body
    const friend = new Friend(friendData);
    friend
      .save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
      })
  }) 

router
  .route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    Friend
      .findById(id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
      })
  })

  .delete((req, res) => {
    const id = req.params.id;
    Friend
      .findByIdAndRemove(id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friend could not be removed" })
      })
  })

  .put((req, res) => {
    const id = req.params.id;
    const friendInfo = req.body;
    Friend
      .findByIdAndUpdate(id, friendInfo)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friend information could not be modified." })
      })
  })

module.exports = router;
