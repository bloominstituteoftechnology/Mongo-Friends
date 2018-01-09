const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const User = require('./Users/UsersModel.js');
const Post = require('./Posts/PostsModel.js');

const server = express();
server.use(bodyParser.json());
const port = 5000;

// Error codes' messages
// const Error200 = '';
// const Error201 = '';
// const Error400 = '';
// const Error500 = '';

// == USE ==
server.use(bodyParser.json());

// ****** Users Routes *****
// === GET ===
server.get('/', (req, res) => {
  res.status(200).json({ message: 'API running' });
});
server.get('/api/users', (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});

// === POST ===
server.post('/api/users', (req, res) => {
  const userReceived = req.body;

  if (userReceived.email && userReceived.username) {
    const user = new User(userReceived);

    user
      .save() // returns a promise
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'There was an error while saving the database' });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide both email and username'
    });
  }
});
// === PUT ===
// === DELETE ===

// ***** Posts Routes *****
// === GET ===
server.get('/api/posts', (req, res) => {
  Post.find({})
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});
// === POST ===
server.post('/api/posts', (req, res) => {
  const postReceived = req.body;
  if (postReceived.contents && postReceived.createdBy) {
    const post = new Post(postReceived);
    post
      .save() // returns a promise
      .then(newPost => {
        res.status(500).json({
          errorMessage: 'There was an error while saving to the Database'
        });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Pleas provide both email and username'
    });
  }
});
// === PUT ===
// === DELETE ===

// start server with mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/users')
  //.connect('mongodb://localhost:27017/posts')
  .then(() => {
    server.listen(port, () => {
      console.log('Your databases are running');
    });
  });
