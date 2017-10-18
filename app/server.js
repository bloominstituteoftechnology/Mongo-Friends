const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();
const {Users, BlogPosts} = require('./models');

server.use(bodyParser.json());

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost:27017/users',
  { useMongoClient: true }
);

server.get('/users', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(users);
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a id' });
    return;
  }
  Users.findById(id, (err, user) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(user);
  });
});

server.post('/users', (req, res) => {
  const { username, email } = req.body;
  if (!username) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a username' });
    return;
  }
  if (!email) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a email' });
    return;
  }
  const user = new Users({ username, email });
  user.save((err) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(user);
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a id' });
    return;
  }
  Users.findByIdAndRemove(id, (err, user) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(user);
  });
});

server.get('/posts', (req, res) => {
  BlogPosts.find({}, (err, posts) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(posts);
  });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a id' });
    return;
  }
  BlogPosts.findById(id, (err, post) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(post);
  });
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide contents' });
    return;
  }
  const post = new BlogPosts({ title, contents });
  post.save((err) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(post);
  });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'you must provide a id' });
    return;
  }
  BlogPosts.findByIdAndRemove(id, (err, post) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(post);
  });
});

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log(err);
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});