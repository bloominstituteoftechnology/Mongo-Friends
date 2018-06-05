const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ error: "The friend information could not be retrieved." })
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend({ firstName, lastName, age });
    if (!firstName || !lastName || !age) {
      res.status(400).json({ error: "Please provide First Name, Last Name and Age." });
      return;
    };
    newFriend
      .save()
      .then(savedFriend => {
        res.status(201).json({ success: "Friend saved successfully.", dataReceived: savedFriend });
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the friend to the database." });
      })
  });
  

module.exports = router;