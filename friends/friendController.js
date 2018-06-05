const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ error: "The friend information could not be retrieved." })
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend({ firstName, lastName, age });
    if (!firstName || !lastName || !age) {
      res.status(400).json({ error: "Please provide First Name, Last Name and Age." });
      return;
    };
    newFriend
      .save()
      .then(savedFriend => {
        res.status(201).json({ success: "Friend saved successfully.", dataReceived: savedFriend });
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the friend to the database." });
      })
  });


router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
      res.status(400).send({ error: `${id} is too short or too long in length.` });
      return;
    }
    Friend.findById(id)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ error: `Friend cannot be found with given ID of ${id}.` });
          return;
        }
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(500).json({ error: "Something went terribly wrong!" });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
      res.status(400).send({ error: `${id} is too short or too long in length.` });
      return;
    }
    Friend.findByIdAndRemove(id)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ error: `Friend cannot be found with given ID of ${id}.` });
          return;
        }
        res.status(200).json({ success: `${friend.firstName} is no longer a friend`, "removedFriend": friend });
      })
      .catch(err => {
        res.status(500).json({ error: "Something went terribly wrong!" });
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const updatedFriend = { firstName, lastName, age };
    if (id.length !== 24) {
      res.status(400).send({ error: `${id} is too short or too long in length.` });
      return;
    }
    Friend.findByIdAndUpdate(id, updatedFriend)
      .then(update => {
        if (update === null) {
          res.status(404).send({ error: `Friend cannot be found with given ID of ${id}.` });
          return;
        }
        res.status(200).json({ success: "Friend Updated", dataReceived: update });
      })
      .catch(err => {
        res.status(500).json({ error: "Something went terribly wrong!" });
      })
  });


module.exports = router;