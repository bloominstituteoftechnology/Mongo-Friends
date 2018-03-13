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

friendsRouter.get("/", (req, res) => {});

module.exports = friendsRouter;
