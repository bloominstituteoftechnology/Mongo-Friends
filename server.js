// server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();

const Friend = require('./friends/FriendModel.js');

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res
    .status(200)
    .json({status: 'API Running'});
});

server.post('/friends', (req, res) => {
  const info = req.body;
  const { firstName, lastName, age } = info;

  const friend = new Friend(info);
  if ( firstName && lastName && age ) {
    friend
      .save()
      .then(savedFriend => {
        res
          .status(201)
          .json(savedFriend)
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'Could not save to db'});
      })
  }
  else {
    res
      .status(500)
      .json({ error: 'USERERROR: Must enter first name, last name, and age'});
  }
})
// get all friends
server.get('/friends', (req, res) => {
  Friend.find() // grab all the entries of Friend
    .then(friends => {
      res
        .status(200)
        .json(friends)
    })
    .catch(error => {
      res
        .status(500)
        .json({error: 'Could not get friends'})
    });
});
// get friend based on id
server.get('/friends/:id', (req, res) => {
  const id = req.params.id;
  Friend.findById(id)
    .then(friend => {
      if (friend) { // if the friend exists
        res
          .status(200) // good status
          .json(friend);
      } else {
        res
          .status(404) // doesn't exist
          .json({error: 'this id does not exist'});
      }
    })
    .catch(error => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .json({message: `Invalid ID ${error.value}`});
      } else {
        res
          .status(500)
          .json({error: 'could not get the friend info'})
      }
    })
})

mongoose
  .connect('mongodb://localhost/FriendsList')
  .then(db => {
    console.log(`Connected to ${db.connections[0].name}`);
  })
  .catch(error => {
    console.log('Failed to connect to the Database');
  })

const port = 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
