// const bodyParser = require('body-parser');
// const express = require('express');
// const mongoose = require('mongoose');
const User = require('../models/userModel.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
// const server = express();
// const userRouter = express.Router();

// server.use(bodyParser.json());

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

// // FIND BY ID AND REMOVE
// server.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   User.findByIdAndRemove(id, (err, user) => {
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
// server.delete('/users/:id', (req, res) => {
//   const id = req.params.id;
//   // const { id } = req.params;
//
//   const toDelete = User.find({ _id: id });
//   // console.log(toDelete);
//
//   const query = User.find().remove({ _id: id });
//
//   query.remove({ _id: id }, (err, delUser) => {
//     if (err) {
//       res.status(STATUS_SERVER_ERROR);
//       // res.json(err);
//       res.json({ error: `There is no '${err.value}' to DELETE` });
//     } else if (delUser.result.n === 0) {
//       res.json({ error: 'There is nothing to delete' });
//     } else {
//       // delUser is whatever the callBack is returning
//       res.json(delUser);
//       // res.json({ error: `'${delUser.name}' has been deleted.` });
//     }
//   });
// });


// REMOVE Method
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.remove({ _id: id }, (err, delUser) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      // res.json(err);
      res.json({ error: `There is no '${err.value}' to DELETE` });
    } else if (delUser.result.n === 0) {
      res.json({ error: 'There is nothing to delete' });
    } else {
      res.json(delUser);
    }
  });
});

module.exports = userRouter;
