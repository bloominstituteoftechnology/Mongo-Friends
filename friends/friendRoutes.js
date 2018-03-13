const express = require('express');
const fakeBook = require('./friendModel');
const fakeBookRouter = express.Router();

fakeBookRouter.post('/', function(req, res) {
  const friendInfo = req.body;
  const newFriend = new fakeBook(friendInfo);
    if (!newFriend.firstName || !newFriend.lastName || !newFriend.age) {
      res.status(400).json({error: 'Please, provide first name, last name, and age for your friend.'});
    } else
    if (/*isNaN(newFriend.age) ||*/ newFriend.age < 1 || newFriend.age > 120) {
      res.status(400).json({error: 'Age must be a whole number between 1 and 120, dawg!'})
    } else {
      newFriend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(err => {
          res.status(500).json({error: 'There was an error while saving the firend to the database.'})
        });
    }
});

fakeBookRouter.get('/', function(req, res) {
    fakeBook
      .find({})
      .then(friends => {
          res.status(200).json(friends);
      })
      .catch(err => {
          res.status(500).json({error: 'The information could not be retrieved'})
      });
});

fakeBookRouter.get('/:id', function(req, res) {
  const { id } = req.params
  fakeBook
    .findById(id)
    .then(friend => {
      if (!friend) {
        res.status(404).json({ message: 'The Friend with the specified ID does not exist.' });
      } else {
        res.status(200).json(friend);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'The information could not be retrieved'});
    });
});

fakeBookRouter.delete('/:id', function(req, res) {
  const { id } = req.params
  fakeBook
    .findByIdAndRemove(id)
    .then(friend => {
      if (!friend) {
        res.status(404).json({ message: 'The Friend with the specified ID does not exist.' });
      } else {
        res.status(200).json(friend);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'The friend could not be removed'});
    });
});

fakeBookRouter.put('/:id', function(req, res) {
  const { id } = req.params
  const updateInfo = req.body;
  if (!updateInfo.firstName || !updateInfo.lastName || !updateInfo.age) {
    res.status(400).json({error: 'Please, provide first name, last name, and age for your friend.'});
  } else
  if (/*isNaN(updateInfo.age) ||*/ updateInfo.age < 1 || updateInfo.age > 120) {
    res.status(400).json({error: 'Age must be a whole number between 1 and 120, dawg!'});
  } else {
    fakeBook
      .findByIdAndUpdate(id, updateInfo, {new: true})
      .then(friend => {
        if (!friend) {
          res.status(404).json({ message: 'The Friend with the specified ID does not exist.' });
        } else {
          res.status(200).json(friend);
        }
      })
      .catch(err => {
        res.status(500).json({error: 'The friend could not be modified'});
      });
  }
});


module.exports = fakeBookRouter;
