
const router = require("express").Router();
const Friend = require("./friendModel");


router
  .route("/")
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends)
      })
      .catch(err => {
        res
          .status(500)
          .json({
            errorMessage: "friends information could not be retrieved."
          });
      });
  })

  .post((req, res) => {
    console.log("body", req.body);
    const friend = new Friend(req.body);
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age)
      return res
        .status(400)
        .json({
          errorMessage:
            "Please provide firstName, lastName and age for the friend."
        });
    if (isNaN(age) || age > 120 || age < 1)
      return res
        .status(400)
        .json({ errorMessage: "Age must be a number between 1 and 120." });
    console.log("friend", friend);
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err =>
        res
          .status(500)
          .json({
            errorMessage: "there was an error saving friend to database"
          })
      );
  });

router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        console.log(friend);
        if (!friend)
          return res
            .status(404)
            .json({
              message: "the friend with the specified ID does not exist."
            });
        res.status(200).json(friend);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            errorMessage: "the friend with specified ID could not be retrieved"
          });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: "friend not found" });
        }
        res.status(200).json(response);
      })
      .catch(err => {
        if (err.name === "CastError") {
          res.status(400).json({
            message: "The id provided is invalid, please check and try again"
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: "the friend could not be removed", err });
        }
      });
  })
  .put((req, res) => {
    const changes = { ...req.body, updatedOn: new Date() };
    Friend.findByIdAndUpdate(req.params.id, req.body)
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
            message: "the id provided is invalid, please check and try again"
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: "the friend could not be removed", err });
        }
      });
  });

module.exports = router;
