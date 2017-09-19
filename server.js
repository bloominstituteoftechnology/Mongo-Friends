const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { Users, BlogPosts } = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide both a name and email address!' });
    return;
  }
  const user = new Users({name, email});
  user.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot save user' });
      return;
    }
    res.json(user);
  });
});

server.get('/users', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot fetch users' });
      return;
    }
    res.json(users);
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot fetch user' });
      return;
    }
    res.json(user);
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot delete user' });
      return;
    }
    res.json({ success: true });
  });
});

server.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide both a title and some content' });
    return;
  }
  const post = new BlogPosts({title, content});
  post.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot save post' });
      return;
    }
    res.json(post);
  })
});

server.get('/posts', (req, res) => {
  BlogPosts.find({}, (err, posts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot fetch posts' });
      return;
    }
    res.json(posts);
  });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPosts.findById(id, (err, post) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot fetch post' });
      return;
    }
    res.json(post);
  }); 
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPosts.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Cannot delete post' });
    }
    res.json({ success: true });
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});