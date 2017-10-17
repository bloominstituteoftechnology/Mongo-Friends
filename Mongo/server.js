const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Post = require('./models/postModel');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(users);
  });
});
server.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(posts);
  });
});

server.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json(foundUser);
  });
});

server.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json(foundPost);
  });
});

server.post('/users', (req, res) => {
  const { name, age, username } = req.body;
  const user = new User({ name, age, username });
  user.save((err, newUser) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json(newUser); 
  });
});

server.post('/posts', (req, res) => {
  const { username, contents } = req.body;
  const post = new Post({ username, contents });
    post.save((err, newPost) => {
      if (err) return res.status(STATUS_USER_ERROR).json(err);
      res.json(newPost); 
  });
});

server.delete('/users/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json({ success: true });
  });
});

server.delete('/posts/:id', (req, res) => {
    Post.remove({ _id: req.params.id }, (err) => {
      if (err) return res.status(STATUS_USER_ERROR).json(err);
      res.json({ success: true });
    });
  });

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/app-db',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});