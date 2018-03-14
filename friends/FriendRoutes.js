const express = require('express');
const Friend = require('./FriendModel.js');

const friendRouter = express.Router();

//=========================
//      friend POST
//=========================

friendRouter.post('/', (req, res) => {
  const friendInfo = req.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  } else {
  const friend = new Friend(friendInfo);
  friend
    .save()
    .then(savedFriend => {
      res.status(201).json(savedFriend);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the friend to the database" });
    });
  }
});

//=========================
//      friend GET
//=========================

friendRouter.get('/', (req, res) => {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

//=========================
//      friend GET
//=========================

friendRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findById(id)
    .then(friend => {
      if (!friend) {
      res.status(404).json({ message: "The friend with the specified ID does not exist." });
      } else {
      res.status(200).json(friend);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

//=========================
//      friend DELETE
//=========================

friendRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (!friend) {
        res.status(404)
        .json({ message: "The friend with the specified ID does not exist." });
      }
      res.status(200).json(friend);
    })
    .catch(err => {
      res.status(500).json({ error: "The friend could not be removed" });
    });
});

//=========================
//      friend PUT
//=========================

friendRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const friendInfo = req.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
  }
  else {
    Friend.findByIdAndUpdate(id, friendInfo, { new: true, runValidators: true })
      .then(friend => {
        if (!friend)
          res.status(404).send({ message: 'The friend with the specified ID does not exist.' });
        else {
          res.status(200).send(friendInfo);
        }
      })
      .catch(err =>
        res
          .status(500)
          .send({ error: 'The friend information could not be modified.' })
      );
  }
});

module.exports = friendRouter;