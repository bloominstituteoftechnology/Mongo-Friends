const express = require("express");

const Friend = require("./FriendSchema.js");

const FriendRouter = express.Router();

FriendRouter.post("/", (request, response) => {
  const friendInfo = request.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    response.status(400).send({
      errorMessage:
        "400 Bad Request! Friends require a firstName, lastName, and age"
    });
  } else if (friendInfo.age < 1 || friendInfo.age > 120) {
    response.status(400).send({
      errorMessage:
        "400 Bad Request! Age must be a whole number between 1 and 120"
    });
  } else {
    const friend = new Friend(friendInfo);
    friend
      .save()
      .then(savedFriend => {
        response.status(201).send(savedFriend);
      })
      .catch(err => {
        response.status(500).send({ error: "There was an error while saving the friend to the database" });
      })
  }
});

FriendRouter.get("/", (request, response) => {
  Friend.find({})
    .then(friends => {
      response.status(200).send(friends);
    })
    .catch(err => {
      response.status(500).send({ error: "the information could not be retrieved."})
    })
})

module.exports = FriendRouter;
