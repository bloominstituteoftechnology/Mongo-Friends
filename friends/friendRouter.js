const express = require('express');

const Friend = require('./FriendModel.js');

const friendRouter = express.Router();

// Create a new Friend.
// Presumably returns newly created Friend.
friendRouter.post('/', (req, res) => {
  const friendInfo = req.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
  }
  if (
    friendInfo.age < 1 ||
    friendInfo.age > 120 ||
    typeof friendInfo.age !== 'number' ||
    friendInfo.age % 1 !== 0
  ) {
    return res.status(400).json({ errorMessage: 'Age must be a whole number between 1 and 120' });
  }
  const friend = new Friend(friendInfo);

  friend
    .save()
    .then(savedFriend => {
      res.status(201).json({ message: 'Friend successfully created.', friend: savedFriend });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: 'There was an error while saving the friend to the database' });
    });
});

// Returns an array of all the friend objects contained in the database.
friendRouter.get('/', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json({ message: 'Here is the list of friends.', friends });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'The information could not be retrieved.' });
    });
});

// Returns the friend object with the specified id.
friendRouter.get('/:id', (req, res) => {});

// Removes the friend with the specified id.
// Returns the deleted friend.
friendRouter.delete('/:id', (req, res) => {});

// Updates the friend with the specified `id` using data from the `request body`.
// Returns the modified document, **NOT the original**
friendRouter.put('/:id', (req, res) => {});

module.exports = friendRouter;
