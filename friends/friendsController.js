const router = require("express").Router();
const Friend = require("./friendsModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(savedFriend => {
        if (typeof savedFriend.age !== 'Number' || savedFriend.age < 1 || savedFriend.age > 120) {
          res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
        } else if (!savedFriend.age || !savedFriend.firstName || !savedFriend.lastName) {
          res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        } else {
        res.status(201).json(savedFriend);
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router
  .route("/:id")

  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })

  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: "not found" });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === "CastError") {
          res.status(400).json({
            message: "The id provided is invalid, please check and try again."
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: "The friend could not be removed", err });
        }
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const updateInfo = req.body;
    Friend.findByIdAndUpdate(id, updateInfo)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: "not found" });
        } else {
          Friend.findById(req.params.id).then(friends => {
            res.status(200).json(friends);
          });
        }
      })
      .catch(err => {
        if (err.name === "CastError") {
          res.status(400).json({
            message: "The id provided is invalid, please check and try again."
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: "The friend could not be removed", err });
        }
      });
  });
module.exports = router;
