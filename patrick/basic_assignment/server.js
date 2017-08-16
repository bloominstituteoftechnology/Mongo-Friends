const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please entaer a NAME.' });
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


// // REMOVE Method
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
// per: http://mongoosejs.com/docs/api.html#query_Query-remove
server.delete('/users/:id', (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  // console.log(id);

  // const query = User.find({ _id: id });

  // per README.md: \_id ???
  // query.remove({ _id: id }, (err, delUser) => {
  User.remove({ _id: id }, (err, delUser) => {
    // console.log(delUser);
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
      // res.json({ error: `There is no '${err.value}' to DELETE: ${err}` });
    } else if (delUser.result.n === 0) {
      res.json({ error: 'There is nothing to delete' });
    } else {
      // console.log(delUser);
      // delUser is whatever the callBack is returning
      res.json(delUser);
      // res.json({ error: `'${delUser.name}' has been deleted.` });
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
