const router = require('express').Router();

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
    const friends = new Friend(req.body);

    friends
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        res.status(500).json(err);
    });

  })

  module.exports = router;
