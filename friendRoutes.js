const express = require('express');
const Friend = require('./friendModel.js');
const friendsRouter = express.Router();

friendsRouter.post('/', function (req, res) {
  const friendInfo = req.body;
  if (!friendInfo || !friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    return
  }
  if (!Number.isInteger(friendInfo.age) || friendInfo.age > 120 || friendInfo.age < 1) {
    res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
    return;
  }
  const friend = new Friend(friendInfo);

  friend
    .save()
    .then(savedFriend => {
      res.status(201).json(savedFriend);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the friend to the database" });
    });
});

friendsRouter.get('/', function (req, res) {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});
friendsRouter.get('/:id', (req, res) => {

  const { id } = req.params;
  Friend.findById(id, (err, friend) => {
    if (err) {
      res.status(500);
      res.send({ error: "The information could not be retrieved." })
      throw err;
    }
    if (!friend) {
      res.status(404);
      res.send({ message: "The Friend with the specified ID does not exist." })
      return;
    }
    res.json(friend);
  })
});
friendsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  Friend.findById(id, (err, friend) => {

    if (!friend) {
      res.status(404);
      res.send({ message: "The Friend with the specified ID does not exist." })
      return;
    }
    Friend.deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(500);
        res.send({ error: "The Friend could not be removed" })
        throw err;
      }
      res.status(200);
      res.json(friend)
    });

  })
});


friendsRouter.put('/:id', function (req, res) {
  const id = req.params.id;
  const friendUpdate = req.body;
  if (!friendUpdate || !friendUpdate.firstName || !friendUpdate.lastName || !friendUpdate.age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    return
  }
  if (!Number.isInteger(friendUpdate.age) || friendUpdate.age > 120 || friendUpdate.age < 1) {
    res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
    return;

  }

  Friend.findByIdAndUpdate(id, friendUpdate, { new: true })
    .then(
      (friend) => {
        if (friend === null) {
          res.status(404);
          res.send({ message: "The Friend with the specified ID does not exist." })
          return;
        }
        res.status(200);
        res.json(friend);
      })
    .catch(
      (err) => {
        if (err) {
          if (err.name === 'CastError') {
            res.status(404);
            res.send({ message: "The Friend with the specified ID does not exist." })
            return;
          } else {
            res.status(500);
            res.send({ error: "The Friend information could not be modified." })
            throw err;
          }

        }
      }
    );
});
module.exports = friendsRouter;
