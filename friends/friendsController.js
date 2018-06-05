const router = require('express').Router();
const friend = require('./friendsModel');

// methods
const errorMessage = (status, message, res) => {
  res.status(status).json({
    errorMessage: message
  })
  return;
}

router
  .route('/')
  .get((req, res) => {
    friend.find()
      .then(friends => {
        // if (!friends.friends) {
        //   errorMessage(404, 'friends could not be found', res);
        // }
        res.status(200).json(friends);
      })
      .catch(err => res.status(500).json({
        error: 'Error making friends'
      }));
  })
  .post((req, res) => {
    const {
      firstName,
      lastName,
      age
    } = req.body;
    const newFriend = new Friend({
      firstName,
      lastName,
      age
    });
    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage: "Please provide firstName, lastName and age for the friend."
      })
    } else if (isNaN(age) || age < 1 || age > 120) {
      res.status(400).json({
        errorMessage: "Age must be a number between 1 and 120"
      })
    } else {
      newFriend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(error => {
          res.status(422).json({
            error: error
          });
        });
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    const {
      id
    } = req.params;
    friend.findById(id)
      .then(foundFriend => {
        res.status(200).json(foundFriend);
      })
      .catch(err => {
        // if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        if (err.name === 'CastError') {
          res.status(404).json({
            errorMessage: "The friend with the specified ID does not exist."
          })
        } else {
          res.status(500).json({
            errorMessage: "The friend information could not be retrieved."
          })
        }
      })
  })
  .delete((req, res) => {
    const {
      id
    } = req.params;
    friend.findByIdAndRemove(id)
      .then(response => {
        if (!response) {
          res.status(404).json({
            errorMessage: "The friend with the specified ID does not exist."
          })
        }
        res.json({
          success: `Friend with ${id} found and deleted!`
        })
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "The friend could not be removed"
        })
      })
  })
  .put((req, res) => {
    const {
      id
    } = req.params;
    const {
      newInput
    } = req.body;
    if (newInput.age && (isNaN(newInput.age) || newInput.age < 1 || newInput.age > 120)) {
      res.status(400).json({
        errorMessage: "Age must be a number between 1 and 120"
      })
    }
    friend.findByIdAndUpdate(id, newInput)
      .then(response => {
        if (!response) {
          res.status(404).json({
            errorMessage: "The Friend with the specified ID does not exist."
          })
        }
        res.json(response);
      })
      .catch(error => {
        res.status(500).json({
          error: `Friend with id of ${id} could not be updated`
        })
      })
  });
delete((req, res) => {
  const {
    id
  } = req.params
  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend === null) {
        res.status(404).json({
          errorMessage: "The friend with the specified ID does not exist."
        })
      } else {
        res.status(200).json(friend)
      }
    })
    .catch(error => {
      if (error.name === "CastError") {
        res.status(404).json({
          errorMessage: "The friend with the specified ID does not exist."
        })
      } else {
        res.status(500).json({
          errorMessage: "The friend could not be removed."
        })
      }
    })
})



module.exports = router;