const router = require("express").Router();

const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "The friends information could not be retrieved."
        });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const friend = new Friend(req.body);

    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(err => {
          res.status(500).json({
            err: "There was an error while saving the friend to the database."
          });
        });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        if (res.status(404)) {
          res.json({
            message: "The friend with the specified ID does not exist."
          });
        } else {
          res.status(500).json({
            errorMessage: "The friend information could not be retrieved."
          });
        }
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: "The friend with the specified ID does not exist."
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "The friend could not be removed." });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: "The friend with the specified ID does not exist."
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({
            errorMessage: "The friend information could not be modified."
          });
      });
  });

module.exports = router;
