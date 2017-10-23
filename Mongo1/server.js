const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models');
const Post = require('./models2');
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());


server.post('/users', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Must post password and unique username' });
        return;
    }
    const user = new User({ username, password });
    user.save((err, newUser) => {
      if (err) {
        res.status(STATUS_USER_ERROR);
        res.json(err);
        return;
      }
      res.json(newUser);
    })
})

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  })
})

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, foundUser) => {
    if (err) {
      return res
        .status(STATUS_SERVER_ERROR)
        .json(err)
    }
    res.json(foundUser);
  })
})

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, deleteUserInfo) => {
    if (err) {
      throw err;
    }
    console.log(deleteUserInfo)
    res.json(deleteUserInfo);
  })
})

/*Posts here */

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: 'Must post title and contents' })
      return;
  }
  const post = new Post({ title, contents });
  post.save((err, newPost) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(newPost);
  })
})

server.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      throw err;
    }
    res.json(posts);
  })
})

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, foundPost) => {
    if (err) {
      return res
        .status(STATUS_SERVER_ERROR)
        .json(err)
    }
    res.json(foundPost);
  })
})

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findByIdAndRemove(id, (err, deletePost) => {
    if (err) {
      throw err;
    }
    res.json(deletePost);
  })
})


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

const connect2 = mongoose.connect(
  'mongodb://localhost/posts',
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
