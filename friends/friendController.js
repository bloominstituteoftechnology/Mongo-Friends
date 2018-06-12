const router = require('express').Router();

const Friend = require('./friendModel');


router.route('/').get(get).post(post);

router.route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        if (!friend) {
          res.status(404).json({ message: "The friend with the specified ID does not exist."});
        } else {
          res.status(200).json(friend);
        }
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "The friend information could not be retrieved."});
      });
  })
  .put((req, res) => {
    const friendData = req.body;

    if (!friendData.firstName || !friendData.lastName || !friendData.age) {
      return res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend."});
    }

    if (isNaN(Number(friendData.age)) || friendData.age < 1 || friendData.age > 120) {
      return res.status(400).json({ errorMessage: "Age must be a number between 1 and 120"});
    }

    Friend.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(friend => {
        if (!friend) {
          res.status(404).json({ message: "The friend with the specified ID does not exist."});
        } else {
          res.status(200).json(friend);
        }
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "The friend information could not be updated."});
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => {
        if (!friend) {
          res.status(404).json({ message: "The friend with the specified ID does not exist."});
        } else {
          res.status(200).json({ message: `Friend with id ${friend._id} deleted.`});
        }
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "The friend information could not be removed."});
      });

  })

function get(req, res) {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friends information could not be retrieved."});
    });

}

function post(req, res) {
  const friendData = req.body;

  if (!friendData.firstName || !friendData.lastName || !friendData.age) {
    return res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend."});
  }

  if (isNaN(Number(friendData.age)) || friendData.age < 1 || friendData.age > 120) {
    return res.status(400).json({ errorMessage: "Age must be a number between 1 and 120"});
  }

  const friend = new Friend(friendData);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error while saving the friend to the database."});
    });
}

module.exports = router;