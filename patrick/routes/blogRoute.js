const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blogModel.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();
const blogRouter = express.Router();

server.use(bodyParser.json());

server.post('/posts', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please entaer a NAME.' });
    return;
  }
  const user = new Blog({ name });
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

// // FIND BY ID AND REMOVE
// server.delete('/posts/:id', (req, res) => {
//   const { id } = req.params;
//   Blog.findByIdAndRemove(id, (err, user) => {
//     if (err) {
//       res.status(STATUS_SERVER_ERROR);
//       res.json({ error: `There is no '${err.value}' to DELETE: ${err}` });
//     } else if (user === null) {
//       res.json({ error: `There's no user to DELETE at id: ${id} >>> ${user}.` });
//     } else {
//       res.json({ error: `'${user.name}' has been deleted.` });
//     }
//   });
// });


// // FIND & REMOVE Method
// // per: http://mongoosejs.com/docs/api.html#query_Query-remove
// server.delete('/posts/:id', (req, res) => {
//   const id = req.params.id;
//   // const { id } = req.params;
//
//   const toDelete = Blog.find({ _id: id });
//   // console.log(toDelete);
//
//   const query = Blog.find().remove({ _id: id });
//
//   query.remove({ _id: id }, (err, delBlog) => {
//     if (err) {
//       res.status(STATUS_SERVER_ERROR);
//       // res.json(err);
//       res.json({ error: `There is no '${err.value}' to DELETE` });
//     } else if (delBlog.result.n === 0) {
//       res.json({ error: 'There is nothing to delete' });
//     } else {
//       // delBlog is whatever the callBack is returning
//       res.json(delBlog);
//       // res.json({ error: `'${delBlog.name}' has been deleted.` });
//     }
//   });
// });


// REMOVE Method
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Blog.remove({ _id: id }, (err, delBlog) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      // res.json(err);
      res.json({ error: `There is no '${err.value}' to DELETE` });
    } else if (delBlog.result.n === 0) {
      res.json({ error: 'There is nothing to delete' });
    } else {
      res.json(delBlog);
    }
  });
});

module.exports = blogRouter;
