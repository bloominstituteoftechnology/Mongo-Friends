const router = require('express').Router();
const friend = require('./friendsModel');

router
  .route('/')
  .get((req, res) => {
    friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => res.status(500).json({
        error: 'Error fetching friends'
      }));
  })
  .post((req, res) => {
    const {
      firstName,
      lastName,
      age
    } = req.body;
    const newFriend = new Friend({
      firstName,
      lastName,
      age
    });
    newFriend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        res.status(422).json({
          error: err
        });
      });
  });




module.exports = router;