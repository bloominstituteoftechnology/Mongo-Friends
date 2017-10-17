const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

mongoose.Promise = global.Promise;

const connect = mongoose.connect(
	'mongodb://localhost/users',
	{ useMongoClient: true }
);


server.get('/users', (req,res) => {
	Users.find({}, (err, users) => {
    if (err) {
      return res.status(STATUS_USER_ERROR).json(err);
    }
    res.json(users);
	})

});

server.get('/users/:id', (req, res) => {
	const { id } = req.params;
	Users.findById(id, (err, foundUser) => {
    if (err) {
      return res.status(STATUS_USER_ERROR).json(err);
    }
    res.json(foundUser);
	})
})

server.post('/users', (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must provide a username' });
    return;
  }
  const user = new Users({ username });
  user.save((err, newUser) => {
    if (err) {
      return res.status(STATUS_USER_ERROR).json(err);
    }
    res.json(newUser);
  });
});

server.delete('/users/:id', (req, res) => {
	const { id } = req.params;
    Users.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'Could not delete a user with that id' });
            return;
        } else {
            res.json(deletedUser);
        }
    });
})

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});