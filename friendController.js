const router = require('express').Router();

const Friend = require('./FriendModel');


router.route('/').get(get).post(post);

router.route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id).then(friend => {
      res.status(200).json(friend);
    })
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(friend => {
      res.status(200).json(friend);
    })
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id).then(friend => {
      res.status(200).json({ message: `Friend with id ${friend._id} deleted.`});
    })
  })

function get(req, res) {
  Friend.find().then(friends => {
    res.status(200).json(friends);
  })
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
      res.status(500).json(err);
    });
}

module.exports = router;
