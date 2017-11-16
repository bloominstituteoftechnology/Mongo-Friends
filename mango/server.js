const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const server = express();

const Users = require('./models.js');
const BlogPost = require('./blogPost.js');

server.use(bodyParser.json());
server.use(cors());

/* *** Status *** */
const STATUS_USER_ERROR = 422;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const STATUS_SUCCESS = 200;
const STATUS_NOT_LOGIN = 401;

/* *** Error Message *** */
const USER_ERROR = { error: 'Something wrong with user submission' };
const NOT_FOUND_ERROR = { error: 'couldn\'t find the requested user.' };
const SERVER_ERROR = { error: 'Something went wrong with the server.' };
const NOT_LOGIN = { error: 'There is no user logged in.' };

/* *** Users *** */
server.get('/api/users', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) res.status(STATUS_SERVER_ERROR).send(SERVER_ERROR);
    else res.status(STATUS_SUCCESS).send(users);
  });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id, (err, user) => {
    if (err) res.status(STATUS_NOT_FOUND).send(NOT_FOUND_ERROR);
    else res.status(STATUS_SUCCESS).send(user);
  });
});

server.post('/api/users', (req, res) => {
  const newUser = new Users(req.body);

  newUser.save((err, user) => {
    if (err) res.status(STATUS_USER_ERROR).send(USER_ERROR);
    else res.status(STATUS_SUCCESS).send(user);
  });
});

server.delete('/api/users', (req, res) => {
  const { id } = req.body;

  Users.findById(id, (err, user) => {
    if (err) res.status(STATUS_NOT_FOUND).send(NOT_FOUND_ERROR);
    else return user;
  }).remove((err, confirm) => {
    if (err) res.status(STATUS_SERVER_ERROR).send(SERVER_ERROR);
    else res.status(STATUS_SUCCESS).send(confirm);
  });
});

/* *** Blog Posts *** */
server.get('/api/blog', (req, res) => {
  BlogPost.find({}, (err, posts) => {
    if (err) res.status(STATUS_SERVER_ERROR).send({ error: 'message' });
    else res.status(STATUS_SUCCESS).send(posts);
  });
});

server.get('/api/blog/:id', (req, res) => {
  const { id } = req.params;

  BlogPost.findById(id, (err, post) => {
    if (err) res.status(STATUS_NOT_FOUND).send({ error: 'Blog post couldn\'t be found.'});
    else res.status(STATUS_SUCCESS).send(post);
  });
});

server.post('/api/blog', (req, res) => {
  const { title, content, } = req.body;

  const user = Users.findOne({ loggedIn: true }, (err, user) => {
    if (err) res.status(STATUS_NOT_LOGIN).send(NOT_LOGIN);
    return user;
  })
  .then((user) => {
    const newPost = new BlogPost({ title, content, user, });
    newPost.save((err, post) => {
      if (err) res.status(STATUS_SERVER_ERROR).send({ error: 'server side', text: { title, content, }, });
      else res.status(STATUS_SUCCESS).send(post);
    });
  });
});

server.delete('/api/blog', (req, res) => {
  const { id } = req.body;

  BlogPost.findById(id, (err, post) => {
    if (err) res.status(STATUS_NOT_FOUND).send({ error: 'post not found' });
    else return post;
  }).remove((err, confirm) => {
    if (err) res.status(STATUS_SERVER_ERROR).send(SERVER_ERROR);
    else res.status(STATUS_SUCCESS).send(confirm);
  });
});

/* *** Plumbing *** */
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then((db) => {
    const port = 3000;
    console.log('All your databases belong to us!');
    server.listen(port, () => {
      console.log(`server running on port ${port}!`);
    });
  })
  .catch((err) => {
    console.log('database connection failed', err.message);
  });
