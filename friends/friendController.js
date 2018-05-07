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
          error: "Friends info could not be retrieved."
        });
      });
  })
  // POST /api/friends
  .post((req, res) => {
    const friendData = req.body;

    const friend = new Friend(friendData);

    friend
      .save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while posting a friend."
        });
      });
  });

// CRUD /api/friends/:id
router
  .route("/:id")
  // GET /api/friends/:id
  .get((req, res) => {
    const { id } = req.params;

    Friend.findById(id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error retrieving friend info."
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
          error: "There was an error deleting a friend."
        });
      });
  });

module.exports = router;
