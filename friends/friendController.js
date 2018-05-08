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
    if ( !friendData.firstName || !friendData.lastName || !friendData.age ) {
      return res.status(400).json({ errorMessage: "Please provide a first name, last name, and age for the friend." }
    )}
    if ( friendData.age > 120 || friendData.age < 1 ) {
      return res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" }
    )}
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
        res.status(404).json({ errorMessage: "The friend with the specified ID does not exist."});
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
    if ( !friendInfo.firstName || !friendInfo.lastName || !friendInfo.age ) {
      return res.status(400).json({ errorMessage: "Please provide a first name, last name, and age for the friend." }
    )}
    if ( friendInfo.age > 120 || friendInfo.age < 1 ) {
      return res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" }
    )}
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
