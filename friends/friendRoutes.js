const express = require("express");

const Friend = require("./FriendModel");

const friendsRouter = express.Router();

friendsRouter.post("/", (req, res) => {
  const friendInfo = req.body;
  const { firstName, lastName, age } = req.body;
  const { ageValidator } = req.body;

  if (!firstName || !lastName || !age) {
    res.status(400).json({
      errorMessage:
        "Please provide firstName, lastName and age for the friend.",
    });
  } else {
    const friend = new Friend(friendInfo);

    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(friendInfo);
      })
      .catch(err => {
        if (err.name === "ValidationError") {
          res.status(400).json({
            errorMessage: "Age must be a whole number between 1 and 120.",
          });
        } else {
          res.status(500).json({
            error:
              "There was an error while saving the friend to the database.",
            error: err,
          });
        }
      });
  }
});

friendsRouter.get("/", (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved.",
      });
    });
});

friendsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  Friend.findById(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({
          message: "The friend with the specified ID does not exist.",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved.",
      });
    });
});

friendsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({
          message: "The friend with the specified ID does not exist.",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The friend could not be removed.",
      });
    });
});

module.exports = friendsRouter;
