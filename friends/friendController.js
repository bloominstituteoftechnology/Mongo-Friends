const router = require("express").Router();
const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({
          error: "The friend information could not be retrieved."
        });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend({ firstName, lastName, age });
    if (!firstName || !lastName || !age) {
      res
        .status(400)
        .json({
          error: "Please provide firstName, lastName and age for the friend."
        });
      return;
    }
    newFriend
      .save() 
      .then(savedFriend => {
        res.status(201).json({ "success": "Friend saved successfully", "savedFriend": savedFriend });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the friend to the database."
        });
      });
  });

  router
    .route("/:id")
    .get((req, res) => {
      const { id } = req.params;
      Friend.findById(id)
        .then(foundFriend => {
          console.log(foundFriend);
          if (foundFriend === null) {
            res
              .status(404)
              .json({
                error: `No friend with id${id} found. Can't retrieve it!`
              });
            return;
          }
          res.json({ requestedFriend: foundFriend });
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: "The friend information could not be retrieved."
            });
        });
    })
    .delete((req, res) => {
      const { id } = req.params;
      Friend.findByIdAndRemove(id)
        .then(friend => {
          if (friend === null) {
            res
              .status(404)
              .json({
                error: `No friend with id${id} found. Can't delete it!`
              });
            return;
          }
          res.json({
            success: "Friend deleted successfully",
            removedFriend: friend
          });
        })
        .catch(err => {
          res
            .status(404)
            .json({
              error: `No friend with id${id} found. Can't delete it!`
            });
        });
    })
    .put((req, res) => {
      const { id } = req.params;
      const { firstName, lastName, age } = req.body;
      if (!firstName || !lastName || !age) {
        sendError(400, "Must provide firstName, lastName and age to update a friend", res);
        return;
      }
      Friend.findByIdAndUpdate(id, req.body)
        .then(updatedFriend => {
          if (updatedFriend === null) {
            res
              .status(404)
              .json({
                error: `No friend with id${id} found. Can't update it!`
              });
            return;
          }
          res.json({
            success: "Friend updated successfully",
            updatedFriend: updatedFriend
          });
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: "The friend information could not be updated."
            });
        });
    });

module.exports = router;
