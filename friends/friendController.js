const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json(`Error GETting friend: ${err}`);
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(savedFriend => {
        res.status(200).json(savedFriend);
      })
      .catch(err => {
        res.status(500).json(`Error POSTing friend: ${err}`);
      });
  });

module.exports = router;
