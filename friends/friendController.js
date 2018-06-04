const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get((req, res) => {
    Friend.find({ _id: req.params.id })
    .then(friend => {
      if (friend.length > 0){
        res.status(404).json({ friend });
      } else {
        res.status(404).json({ message: "The friend with the specified ID does not exist." })
      }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
    });
  })
  .delete((req, res) => {
    Friend.remove({ _id: req.params.id })
    .then((friend) => {
      if(friend){
        res.status(200).json({ status: 'Deleted friend with ID: ' + req.params.id });
      } else {
        res.status(404).json({ message: "The friend with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friend could not be removed" });
    });
  })
  .put((req, res) => {
    const { id } = req.params;
    const update = ({ $set: req.body });
    Friend.findById(id)
    .then(friend => {
      if (req.body.age > 120 || req.body.age < 1) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
      } else {
        friend.update(update)
        .then(() => {
          res.status(201).json(req.body);
        })
        .catch(err => {
          res.status(500).json({ msg: err });
        })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friend information could not be modified." });
    });
  });

  function get(req, res) {
    Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
    })
  }

  function post(req, res) {
    const friendData = req.body;

    const friend = new Friend(friendData);
    if(friend.age > 1 && friend.age < 120) {
      friend
        .save()
        .then(friend => {
          res.status(201).json(friend);
        })
        .catch(err => {
          if (err.name === 'ValidationError') {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
          } else {
            res.status(500).json({ errorMessage: "There was an error while saving the friend to the database" });
          }
        });
    } else {
      res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
    }
  }

module.exports = router;