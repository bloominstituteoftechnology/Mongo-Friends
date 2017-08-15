const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERRROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { username, password} = req.body;
  if(!username || !password) {
    res.status(422);
    res.json({ error: "Make sure to input username and password" });
  }
  const user = new Users({ username, password });
  user.save((err) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error"})
    }
    res.json(user);
  })
})
server.get('/users', (req, res) => {
  Users.find({}, (err, data) => {
    if (err) {
      res.status(500);
      res.status({ error: "Server errror"})
    }
    res.json(data);
  })
})
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id, (err, bear) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" })
    }
    res.json(user);
  })
})
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findByIdAndRemove(id, (err, bear) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" })
    }
    res.json(user);
  })
})


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
