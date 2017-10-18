const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./schemas/UserSchema.js');
const Post = require('./schemas/PostSchema.js');
const CORS = require('cors');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());
server.use(CORS());

server.post('/users', (req, res) => {
  const { username, age, password } = req.body;
  const user = new User({ username, age, password });
  user.save(err => {
    if (err) {
      res.status(500);
      res.json({ error: 'Error: its not you, its me' });
      return;
    }
    res.json(user);
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) throw err;
    res.json('User successfully deleted');
  });
});

server.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  post.save(err => {
    if (err) {
      res.status(500);
      res.json({ error: 'Error: its not you, its me' });
      return;
    }
    res.json(post);
  });
});

server.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findByIdAndRemove(id, (err, post) => {
    if (err) throw err;
    res.json('Post successfully deleted');
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/posts', {
  useMongoClient: true
});

/* eslint no-console: 0 */
connect.then(
  () => {
    const port = 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  }
);
