const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

const Friend = require("./FriendModel.js");

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

server.get("/", function(req, res) {
  res.status(200).json({ status: "The API is awake!" });
});

server.post("/friends", (req, res) => {
  const friendInfo = req.body;
  const { firstName, lastName, age } = friendInfo;
  const friend = new Friend(friendInfo);
  if (firstName && lastName && age) {
    if (typeof age !== "number" || age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: "Age must be a whole number between 1 and 120" });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(error => {
          res.status(400).json({
            errorMessage: "There was an error saving the friend to the database"
          });
        });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide a firstName, lastName and age for friend."
    });
  }
});

server.get("/friends", (req, res) => {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The information could not be retrieved" });
    });
});

server.get("/friends/:id", (req, res) => {
  const { id } = req.params;
  Friend.findById(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res
          .status(404)
          .json({
            errormessage: "The friend with the specified ID does not exist"
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: `The information could not be retrieved` });
    });
});

server.delete("/friends/:id", (req, res) => {
  const { id } = req.params;
  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(200).json({ message: "Friend has been deleted" });
      } else {
        res
          .status(404)
          .json({
            errorMessage: "The friend with the specified id does not exist"
          });
      }
    })
    .catch(error => {
      res
        .status(400)
        .json({ errorMessage: `The friend could not be removed` });
    });
});

server.put("/friends/:id", (req, res) => {
  const friendInfo = req.body;
  const { id } = req.params;
  Friend.findByIdAndUpdate(id, friendInfo)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      res
        .status(400)
        .json({ errorMessage: "User cannot be accessed by this id" });
    });
});

mongoose
  .connect("mongodb://localhost/FriendList")
  .then(db => {
    console.log(
      `Successfully connected to the ${db.connections[0].name} database`
    );
  })
  .catch(error => {
    console.log(`Database Connection Failed`);
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
