const router = require("express").Router();

const Friend = require("../models/friendModel");

router.route("/").get((req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The friends information could not be retrieved."
      });
    });
});

router.route("/").post((req, res) => {
  const friend = new Friend(req.body);

  friend
    .save()
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      if (error.name === "ValidationError") res.status(400).json(error.message);
      else
        res.status(500).json({
          errorMessage:
            "There was an error while saving the friend to the database."
        });
    });
});

router.route("/:id").get((req, res) => {
  Friend.findById(req.params.id)
    .then(friend => {
      if (!friend)
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      else res.status(200).json(friend);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.route("/search/:name").get((req, res) => {
  Friend.findOne({ firstName: req.params.name })
    .then(friend => {
      if (!friend)
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      else res.status(200).json(friend);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.route("/:id").delete((req, res) => {
  Friend.findByIdAndRemove(req.params.id)
    .then(response => {
      if (!response)
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      else res.status(204).json(response);
    })
    .catch(error => {
      if (error.name === "CastError") res.status(400).json(error);
      else
        res
          .status(500)
          .json({ errorMessage: "The friend could not be removed" });
    });
});

router.route("/removeByName/:name").delete((req, res) => {
  Friend.findOneAndRemove({ firstName: req.params.id })
    .then(response => {
      if (!response)
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      else res.status(204).json(response);
    })
    .catch(error => {
      if (error.name === "CastError") res.status(400).json(error);
      else
        res
          .status(500)
          .json({ errorMessage: "The friend could not be removed" });
    });
});

router.route("/:id").put((req, res) => {
  const id = req.params.id;
  const friendUpdates = req.body;
  const { age, firstName, lastName } = friendUpdates;

  if (!age || !firstName || !lastName) {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName and age for the friend."
    });
  }
  if (req.body.age < 1 || req.body.age > 120) {
    res.json({ errorMessage: "Age must be a number between 1 and 120" });
  }

  Friend.findByIdAndUpdate(id, friendUpdates)
    .then(friend => {
      if (!friend)
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      else {
        const { age, firstName, lastName } = friend;
        const updatedFriend = { age, firstName, lastName, ...req.body };
        res.status(200).json(updatedFriend);
      }
    })
    .catch(error => {
      if (error.name === "CastError")
        res
          .status(400)
          .json({ errorMessage: "Please provide updated information" });
      else
        res.status(500).json({
          errorMessage: "The friend information could not be modified."
        });
    });
});

router.route("/updatebyname/:name").put((req, res) => {
  const query = { firstName: req.params.name };
  const friendUpdates = req.body;
  const { age, firstName, lastName } = friendUpdates;

  if (!age || !firstName || !lastName) {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName and age for the friend."
    });
  }

  if (req.body.age < 1 || req.body.age > 120) {
    res.json({ errorMessage: "Age must be a number between 1 and 120" });
  }
  Friend.findOneAndUpdate(query, friendUpdates)
    .then(friend => {
      if (!friend)
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      else {
        const { age, firstName, lastName } = friend;
        const updatedFriend = { age, firstName, lastName, ...req.body };
        res.status(200).json(updatedFriend);
      }
    })
    .catch(error => {
      if (error.name === "ValidationError") res.status(400).json(error.message);
      else
        res.status(500).json({
          errorMessage: "The friend information could not be modified."
        });
    });
});

module.exports = router;
