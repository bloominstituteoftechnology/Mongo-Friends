const router = require("express").Router();

const Friend = require("./friendModel");

// CRUD friend
router
  .route("/")
  // GET friend
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
  // POST friend
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
//   .post((req, res) => {
//     res.status(201).json(friend);
//   })
//   .catch(error => {
//     res.status(500).json(error);
//   });
