const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel.js');
const Blog = require('./models/blogModel.js');
// const userRouter = require('./routes/userRoute.js');
// const blogRouter = require('./routes/blogRoute.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please enter a NAME.' });
    return;
  }
  const user = new User({ name });
  user.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `There is no record of the id: ${err.value}.` });
    } else {
      res.json(user);
    }
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.remove({ _id: id }, (err, delUser) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else if (delUser.result.n === 0) {
      res.json({ error: 'There is nothing to delete' });
    } else {
      res.json(delUser);
    }
  });
});

// BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG BLOG
server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please enter a TITLE and CONTENTS.' });
    return;
  }
  const user = new Blog({ title, contents });
  user.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.get('/posts', (req, res) => {
  Blog.find({}, (err, posts) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(posts);
    }
  });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `There is no record of the id: ${err.value}.` });
    } else {
      res.json(user);
    }
  });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  Blog.remove({ _id: id }, (err, delBlog) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else if (delBlog.result.n === 0) {
      res.json({ error: 'There is nothing to delete' });
    } else {
      res.json(delBlog);
    }
  });
});


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
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
