const router = require('express').Router();

const FriendModel = require('./Models/friendModel');

//pushes the data to the database
router.post('/', function post(req, res) {
  const friendData = req.body;
  const friend = new FriendModel(friendData);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//gets all the friends from the database
router.get('/', function get(req, res) {
  FriendModel.find().then(friends => {
    res.status(200).json(friends);
  });
});

// gets a specific friend from the database
router.get('/:id', (req, res) => {
  const { id } = req.params;
    FriendModel.findById(id)
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => res.status(500).json(error));
});

// removes a friend from the database
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Bear.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'Friend does not exist' });
      }
    })
    .catch(error => res.status(500).json(error));
});


//updates a friend in the database
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateFriend = req.body;

  const options = {
    new: true,
  };

  FreindModel.findByIdAndUpdate(id, updateFriend, options)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({ msg: 'Friend does not exist' });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;