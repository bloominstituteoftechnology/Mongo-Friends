const router = require("express").Router();

const Friend = require("./friendModel");

// CRUD /api/friends
router
  .route("/")
  // GET /api/friends
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json({
          error: "The friends information could not be retrieved."
        });
      });
  })
  // POST /api/friends
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      res.status(400).json({
        error: "Please provide firstName, lastName and age for the friend."
      });
      return;
    }
    if (age < 1 || age > 120) {
      res.status(400).json({
        error: "Age must be a number between 1 and 120."
      });
    } else {
      const friend = new Friend(req.body);

      friend
        .save()
        .then(friend => {
          res.status(201).json(friend);
        })
        .catch(error => {
          res.status(500).json({
            error: "There was an error while saving the friend to the database."
          });
        });
    }
  });

// CRUD /api/friends/:id
router
  .route("/:id")
  // GET /api/friends/:id
  .get((req, res) => {
    const { id } = req.params;

    Friend.findById(id)
      .then(friend => {
        if (!friend) {
          res.status(404).json({
            error: "The friend with the specified ID does not exist."
          });
        } else {
          res.status(200).json(friend);
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The friends information could not be retrieved."
        });
      });
  })
  // PUT /api/friends/:id
  .put((req, res) => {
    const { id } = req.params;
    const friendData = req.body;

    Friend.findByIdAndUpdate(id, req.body)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error updating a friend."
        });
      });
  })
  // DELETE
  .delete((req, res) => {
    const { id } = req.params;

    Friend.findByIdAndRemove(id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({
          error: "The friend with the specified ID does not exist."
        });
      });
  });

module.exports = router;
