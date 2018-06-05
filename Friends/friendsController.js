const router = require("express").Router();
const Friends = require("./friendsModel");

router
  .route("/")
  .get((req, res) => {
    Friends.find()
      .then(friends => {
        res.json({ friends });
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "The friends information could not be retrieved."
        });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friends({ firstName, lastName, age });
    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    } else if (age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: "Age must be a number between 1 and 120." });
    } else {
      newFriend
        .save()
        .then(friend => {
          res.status(201).json({ friend });
        })
        .catch(error => {
          res.status(500).json({
            errorMessage:
              "There was an error while saving the friend to the database."
          });
        });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Friends.findById(id)
      .then(friend => {
        if (friend) {
          res.json({ friend });
        } else {
          res.status(404).json({
            erroMessage: "The friend with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "The friend information could not be retrieved."
        });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Friends.findByIdAndRemove(id)
      .then(friend => {
        if (friend) {
          res.json({ friend });
        } else {
          res.status(404).json({
            erroMessage: "The friend with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "The friend could not be removed" });
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const updates = ({ firstName, lastName, age } = req.body);
    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    } else if (age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: "Age must be a number between 1 and 120." });
    }
    Friends.findByIdAndUpdate(id, updates, { new: true })
      .then(friend => {
        if (friend) {
          res.json({ friend });
        } else {
          res.status(404).json({
            erroMessage: "The friend with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "The friend information could not be modified."
        });
      });
  });

module.exports = router;
