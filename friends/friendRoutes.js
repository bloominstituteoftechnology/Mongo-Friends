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
        if (err.name === "ValidatorError") {
          res.status(400).json({ msg: "Age must be a whole number between 1 and 120", error: err })
        } else {
        res.status(400).json({ msg: "Please provide firstName, lastName and age for the friend.", error: err });
    }});
});

friendsRouter.get('/', (req, res) => {
    Friend.find({})
      .then(friends => {
          res.status(200).json(friends);
      })
      .catch(err => {
          res.status(500).json({ msg: "Error getting the friends", error: err });
      });
});

friendsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    Friend.findById(id)
      .then(friend => {
          if (friend) {
              res.status(200).json(friend);
          } else {
              res.status(404).json({ msg: "Not Found" })
          }
      })
      .catch(err => {
          res.status(500).json({ msg: "Error getting the Friend", error: err });
      });
});

friendsRouter.delete('/:id', (req, res) => {
    const { id }= req.params;

    Friend.findByIdAndRemove(id)
      .then(friend => {
          if (friend) {
              res.status(200).json(friend);
          } else {
              res.status(404).json({ msg: "The friend with the specified ID does not exist." })
          }
      })
      .catch(err => {
          res.status(500).json({ msg: "Error deleting the friend", error: err })
      });
});

friendsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const friendData = req.body;

    Friend.findByIdAndUpdate(id, friendData, { new: true }) 
      .then(friend => {
          if (friend) {
              res.status(200).json(friend);
          } else {
              res.status(404).json({ msg: "The friend with the specified ID does not exist." })
          }
      })
      .catch(err => {
          if (err.name === "ValidatorError"){
              res.status(400).json({ msg: "Age must be a whole number between 1 and 120", error: err })
          } else if (err) {
            res.status(400).json({ msg: "Please provide firstName, lastName and age for the friend.", error: err })
          } else {
              res.status(500).json({ msg: "The friend information could not be modified.", error: err })
            }
      });
});

module.exports = friendsRouter;