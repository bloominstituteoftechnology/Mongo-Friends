const router = require('express').Router();
const Friend = require('./friendModel');

router.route('/')
  .get((req, res) => {
    Friend.find().then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
    })
  })

  .post((req, res) => {
    if (req.body.firstName === undefined || req.body.lastName === undefined || req.body.age === undefined) res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    if (typeof req.body.age !== 'number') res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
    friendData = req.body;
    const friend = new Friend(friendData);
    friend.save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
      })
  })
router.route('/:id')
  .get((req, res) => {
    const {id} = req.params;
    Friend.findById(id, (err, obj) => {
      if (err) res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
    })
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      })
  })
  .put((req, res) => {
    const {id} = req.params;
    const update = req.body;
    Friend.findByIdAndUpdate(id, update, {new: true})
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friend information could not be modified." });
    })
  })
  .delete((req, res) => {
    const {id} = req.params;
      Friend.findByIdAndRemove(id, (err) => {
        if (err) return res.status(500).json({ errorMessage: "The friend could not be removed" });
      })
      .then(friend => {
        return res.status(200).json(friend);
      })
      .catch(err => {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      })
  })
module.exports = router;
