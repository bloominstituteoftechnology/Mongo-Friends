const router = require("express").Router();

const Friend = require("./friendModel");

router
  .route("/")
  .get(get)
  .post(post);

function get(req, res) {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      errorMessage: "The friends information could not be retrieved.";
    });
}

function post(req, res) {
  const friendData = req.body;

  const friend = new Friend(friendData);
  const { firstName, lastName, age } = friend;
  if (firstName && lastName && age) {
    if (!isNaN(age) && age > 1 && age < 120) {
      friend
        .save()
        .then(friend => {
          res.status(201).json(friend);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res
        .status(400)
        .json({ errorMessage: "Age must be a number between 1 and 120" });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName and age for the friend."
    });
  }
}

module.exports = router;
