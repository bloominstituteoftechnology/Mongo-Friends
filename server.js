const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const UserSchema = require('./models.js');
const PostSchema = require('./blogPosts.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from Post/Get/Delete
server.use(bodyParser.json());

// Get: /users should return an array of all users
server.get('/users', (req, res) => {
  UserSchema.find({}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
});
// Get: /users/:id should return user with matching id
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  UserSchema.findById(id, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

// Post: /users should save new users to the server
server.post('/users', (req, res) => {
  const { species, planet } = req.body;
  if (!species || !planet ) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'User needs all info to be apart from this galaxy'});
    return;
  }
  // create & save new users
  const user = new UserSchema({ species, planet });
  user.save((err) => {
    if (err) throw err;
    res.json(user);
  });
});

// Delete: /users/:id should delete the specified user
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_SERVER_ERROR);
    res.json({ error: 'must provide a user id' });
    return;
  }
  const user = UserSchema.findByIdAndRemove(id, (err, user) => {
    if (!user) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `Couldnt find user with id ${id}` });
      return;
    }
    res.json(user);
  });
});

// GET '/posts' return an array of blog posts
server.get('/blogPosts', (req, res) => {
  PostSchema.find({}, (err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});
// GET '/posts/:id' return blog post with matching id
server.get('/blogPosts', (req, res) => {
  const { id } = req.params;
  PostSchema.findById(id, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});
// POST '/post' should save a new blog post to the server
server.post('/blogPosts', (req, res) => {
  const { title, post } = req.body;
  if (!title || !post) {
    res.status(STATUS_SERVER_ERROR);
    res.json({ error: 'Missing title or content'});
    return;
  }
  // create & save new posts
  const singlePost = new PostSchema({ title, post });
  singlePost.save((err) => {
    if (err) throw err;
    res.json(singlePost);
  });
});
// DELETE '/posts/:id' delete a blog post
server.delete('/blogPosts/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_SERVER_ERROR);
    res.json({ error: 'must provide a blog post id'});
    return;
  }
  const post = PostSchema.findByIdAndRemove(id, (err, post) => {
    if (!post) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `Couldn't find post with id ${id}` });
      return;
    }
    res.json(post);
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  // 'mongodb://localhost/users',
  'mongodb://localhost/blogPosts',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
});