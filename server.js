const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Friend = require('./friends/FriendModel');

const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running...' });
});

server.post('/api/friends', (req, res) => {
  const FriendInfo = req.body;
  const {
    firstName,
    lastName,
    age
  } = req.body;

  if (!firstName || !lastName || !age) {
    console.log(error);
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  } else if (age < 1 || age > 120) {
    console.log(error);
    res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
  }
  const friend = new Friend(FriendInfo);

  friend
    .save()
    .then(newFriend => {
      res.status(201).json(newFriend);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the friend to the database"  });
    });
});

server.get('/api/friends', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.get('/api/friends/:id', (req, res) => {
  const id = req.params.id;

  Friend.findById(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend)
      } else {
        console.log(error);
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.delete('/api/friends/:id', (req, res) => {
  const id = req.params.id;

  Friend.findByIdAndRemove(id)
    .then(removeFriend => {
      if (removeFriend) {
        res.status(200).json(removeFriend)
      } else {
        console.log(error);
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The friend could not be removed" });
    });
});



mongoose
  .connect('mongodb://localhost/friends')
  .then(conn => {
    console.log('connected to mongo');
  })
  .catch(err => {
    console.log('error connecting to mongo');
  });

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`running on port ${port}`));