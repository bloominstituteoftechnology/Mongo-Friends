const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Users');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(cors());
server.use(bodyParser.json());

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/blog', {
  useMongoClient: true,
});

const handleError = (res, status, err) => {
  res.status(status).json(err);
};

server.post('/users', async (req, res) => {
  const { username, email, lastName, firstName } = req.body;

  try {
    const user = await new User({
      username,
      email,
      lastName,
      firstName,
    }).save();
    return res.json(user);
  } catch (error) {
    return handleError(res, STATUS_SERVER_ERROR, error);
  }
});

server.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return handleError(res, STATUS_SERVER_ERROR, error);
  }
});

server.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    return handleError(res, STATUS_SERVER_ERROR, error);
  }
});

server.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.json({ message: 'Sucessfully deleted' });
  } catch (error) {
    return handleError(res, STATUS_SERVER_ERROR, error);
  }
});

connect.then(
  () => {
    const port = 3000;
    server.listen(port, () => {
      console.log(`Server Listening on ${port}`);
    });
  },
  (err) => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  },
);
