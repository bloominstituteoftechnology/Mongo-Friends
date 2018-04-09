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
        console.log("There was an error getting friends.");
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);

    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        console.log("Friend Saved!");
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        console.log("There was a problem retrieving friend.");
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: "Friend successfully deleted!" });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error deleting Friend." });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(friend => {
        console.log("Successfully Updated Friend.");
        res.status(201).json(friend);
      })
      .catch(err => {
        console.log("There was a problem updating friend.");
      });
  });

module.exports = router;
