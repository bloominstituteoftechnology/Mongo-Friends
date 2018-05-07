const router = require('express').Router();
const Friend = require('./friendsModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => res.status(200).json(friends))
      .catch(err => res.status(500).json({ error: "Cannot retrieve friends." }))
  })

  .post((req, res) => {
    const friendData = req.body;
    const friend = new Friend(friendData);
    friend.save()
      .then(friend => res.status(200).json(friend))
      .catch(err => res.status(500).json({ error: "Failed to save friend. Check requirements for new friend." }))
  });

module.exports = router;