const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./model');

const port = process.env.PORT || 3000;

const server = express();
server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { name, age } = req.body;
  const newUser = new User({ name, age });
  newUser.save(newUser, (err, user) => {
     if (err) {
       res.status(422);
       res.json({'Error saving user to DB: ': err.message});
       return;
     }
     res.json(user);
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(422);
      res.json({'Error Fetching users from DB: ': err.message});
      return;
    }
    res.json(users);
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
  .exec((err, user) => {
    if (err) {
      res.status(422);
      res.json({'Error fetching user from DB': err.message});
      return;
    }
    res.json(user);
  })
});

server.delete('/users/:id' , (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, deletedUser) => {
    if (!deletedUser) {
      res.status(422);
      res.json({'Error can not remove a user': err.message});
      return;
    }
    res.json(deletedUser);
  })
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  User.findByIdAndUpdate(id, {name}, () => {
    User.findById(id)
    .exec((err, updatedUser) => {
      if (err) {
        res.status(422);
        res.json({'Error updating user': err.message});
        return;
      }
      res.json(updatedUser);
    })
  })
});




mongoose.Promise = global.Promise;

const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true });

connect.then(() => {
  server.listen(port);
  console.log(`Server is listening on ${port}`);
}, (err) => {
  console.log('\n===================');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('====================\n');
});
  


