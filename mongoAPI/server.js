const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./UserModel/UserModel");

const server = express();
const port = 3000;
server.use(bodyParser.json());
server.use(cors());

server.post('/users', (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({ errorMessage: "Please provide both name and password for the User" });
    return;
  }
  const user = new User({ name, password });
  user.save()
    .then(() => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the User to the Database" });
    });
});

server.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({ successful: `Delete the user by ID: ${id}` });
    })
    .catch(error => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/users", { useMongoClient: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Please start the mongoDB');
  });
