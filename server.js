const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { userName, fullName } = req.body;
  if (!userName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide userName' });
    return;
  }
  if (!fullName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide fullName' });
    return;
  }

  const user = new User({ userName, fullName });
  user.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

// server.get('/users', (req, res) => {
//   // .find() is a method you can use to read all the documents from the
//   // collection.
//   User.find({}, (err, users) => {
//     if (err) {
//       res.status(STATUS_SERVER_ERROR);
//       res.json(err);
//     } else {
//       res.json(users);
//     }
//   });
// });

// server.get('/users/:id', (req, res) => {
//   const { id } = req.params;
//   Bear.findById(id, (err, bear) => {
//     if (err) {
//       res.status(STATUS_SERVER_ERROR);
//       res.json(err);
//     } else {
//       res.json(bear);
//     }
//   });
// });











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