const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const Friend = require('./Friends/FriendModel');

const server = express();
const PORT = process.env.PORT || 5050;

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ status: `API running on port ${PORT}`});
});

server.post('/api/friends', (req, res) => {
  const friendInformation = req.body;
  const { firstName, lastName, age } = friendInformation;

  const friend = new Friend(friendInformation);
  if ( firstName && lastName && age ) {
    if (typeof age !== 'number' || age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a whole number between 1 and 120' });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res
            .status(201)
            .json(savedFriend);
        })
        .catch(error => {
          res
            .status(500)
            .json({ errorMessage: 'There was an error while saving the friend to the database' });
        });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  }
});

server.get('/api/friends', (req, res) => {
  Friend.find()
    .then(friends => {
      res
        .status(200)
        .json(friends);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/friends/:id', (req, res) => {
  const id = req.params.id;
  Friend.findById(id)
    .then(friend => {
      if (friend) {
        res
          .status(200)
          .json(friend);
      } else {
        res
          .status(404)
          .json({ message: 'The friend with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

server.delete('/api/friends/:id', (req, res) => {
  const id = req.params.id;
  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res
          .status(200)
          .json(friend);
      } else {
        res
          .status(404)
          .json({ message: 'The friend with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The friend could not be removed' });
    });
});

mongoose
  .connect('mongodb://localhost/FriendFinder')
  .then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database.`)
  })
  .catch(error => {
    console.log('Database connection failed');
  });

server.listen(PORT, () => {
  console.log(`API runing on http://localhost:${PORT}`);
})