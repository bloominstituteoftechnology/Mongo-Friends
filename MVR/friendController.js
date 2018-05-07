const router = require('express').Router();
const Friend = require('./friendModel');

router.route('/')
  .get((req, res) => {
    Friend.find().then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      console.log('error!', err);
    })
  })

  .post((req, res) => {
    if (req.body.firstName === undefined || req.body.lastName === undefined || req.body.age === undefined) res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    if (typeof req.body.age !== 'number') res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
    friendData = req.body;
    const friend = new Friend(friendData);
    friend.save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
      })
  })
module.exports = router;
