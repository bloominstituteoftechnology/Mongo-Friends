const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./UserModel');
const BlogPosts = require('./BlogModel');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// POST /users = saves a new user to the server
server.post('/users', (req, res) => {
  const newUser = new User(req.body);

  // check the user has all the data here...
  if (!newUser.firstName || !newUser.lastName || !newUser.createdAt) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'Missing required data!' });
    return;
  }
  // ...and save the user if it does:
  newUser.save((err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not create the user" });
      return;
    } else {
      res.status(200).json(user);
    }
  });
});

// GET /users = returns an array of all users
server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not return the users" });
      return;
    } else {
      res.status(200).json(users);
    }
  });
});

// GET /users/:id = return the user w/ matching id (_id on the db document) property
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: "Could not get due to invalid/missing id" });
    return;
  }
  User.findById(id, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not get by id" });
      return;
    } else {
      res.status(200).json(users);
    }
  });
});

// DELETE /users/:id = delete the specified user
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: "Could not get due to invalid/missing id" });
    return;
  }
  User.remove({ _id: id }, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: `Error: ${err}` });
      return;
    } else {
      res.status(200).json(users);
    }
  });
});

// Extra Credit = BlogPosts
// POST /posts = saves a new blog post to the server
server.post('/posts', (req, res) => {
  const newPost = new BlogPosts(req.body);

  // check the user has all the data here...
  if (!newPost.post || !newPost.createdAt || !newPost.author) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'Missing data field!' });
    return;
  }
  // ...and save the user if it does:
  newPost.save((err, post) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not create the post" });
      return;
    } else {
      res.status(200).json(post);
    }
  });
});

// GET /posts = returns an array of all blog posts
server.get('/posts', (req, res) => {
  BlogPosts.find({}, (err, posts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not return the posts" });
      return;
    } else {
      res.status(200).json(posts);
    }
  });
});

// GET /posts/:id = return the blog post w/ matching id (_id on the db document) property
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: "Could not get due to invalid/missing id" });
    return;
  }
  BlogPosts.findById(id, (err, posts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not get by id" });
      return;
    } else {
      res.status(200).json(posts);
    }
  });
});

// DELETE /posts/:id = delete the specified blog post
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: "Could not get due to invalid/missing id" });
    return;
  }
  BlogPosts.remove({ _id: id }, (err, posts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: `Error: ${err}` });
      return;
    } else {
      res.status(200).json(posts);
    }
  });
});


// plumbing
mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server listening on port ${port}`);
}, (err) => {
  console.log('\n********************');
  console.log("Couldn't connect to MongoDB. Do you have it running?");
  console.log('********************\n');
});