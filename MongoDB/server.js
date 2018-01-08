const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./userModel/userInformation.js");

const server = express();

server.use(bodyParser.json());

server.post("/userModel", (req, res) => {
  const userInformation = req.body;
  const user = new User(userInformation);
  user
    .save()
    .then(function(newUser) {
      res.status(201).json(newUser);
    })
    .catch(function(error) {
      res.status(500).json({
        error: "There was an error while save the the User to the Database"
      });
    });
});
server.get("/userModel", function(req, res) {
  User.find({})
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function() {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});
server.get("/userModel/:id", function(req, res) {
  const { id } = req.params;
  User.findById(id)
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(error) {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/userModel")
  .then(function() {
    server.listen(5001, function() {
      console.log("All your databases are belong to us!");
    });
  })
  .catch(function(error) {
    console.log(error);
  });
