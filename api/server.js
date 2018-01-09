const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require(".apigi/User/UserModel.js");
const server = express();
server.use(bodyParser.json());

server.get("/", function(req, res) {
  res.status(200).json({ message: "API running" });
});

server.post("/api/users", (req, res) => {
  const userInformation = req.body;

  if (!userInformation.firstName) {
    res.status(400).json({
      errorMessage: "Please provide First Name"
    });
  } else {
    console.log("user ", User);
    const user = new User(userInformation);
    user
      .save()
      .then(function(newUser) {
        res.status(201).json(newUser);
      })
      .catch(function(error) {
        req.status(500).json({
          error: "There was an error while saving the User to the Database"
        });
      });
  }
});

server.get("/api/users", function(req, res) {
  User.find({})
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function() {
      res.status(500).json({ error: "The information could not be retrieved" });
    });
});

server.get("/api/users/:id", function(req, res) {
  const { id } = req.params;
  User.findById(id)
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function() {
      res.status(500).json({ error: "The information could not be retrieved" });
    });
});

server.delete("/api/users/:id", function(req, res) {
  console.log("delete");
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(function(users) {
      res.status(200).json({ message: "User deleted" });
    })
    .catch(function() {
      res
        .status(500)
        .json({ error: "The information could not be retrieved or deleted" });
    });
});

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/users", { useMongoClient: true })
  .then(function() {
    server.listen(5000, function() {
      console.log("Server running on port 5000");
    });
  })
  .catch(function(error) {
    console.log("Database connection failed");
  });