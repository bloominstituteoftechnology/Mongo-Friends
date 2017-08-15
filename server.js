const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const UserSchema = require('./models.js');

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

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
});