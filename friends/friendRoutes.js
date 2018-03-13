const express = require('express');
const Friend = require('./friendModel.js');

const friendsRouter = express.Router();

friendsRouter.post('/', (req, res) => {
    const friendInfo = req.body;

    const friend = new Friend(friendInfo);

    friend.save()
    .then(savedFriend => {
        res.status(200).json(savedFriend);
    })
    .catch(err => {
        res.status(500).json({ msg: 'Error creating friend', error: err });
    });
});

friendsRouter.get('/', (req, res) => {
    Friend.find({})
      .then(friends => {
          res.status(200).json(friends);
      })
      .catch(err => {
          res.status(500).json({ msg: 'Error getting the friends', error: err });
      });
});

module.exports = friendsRouter;