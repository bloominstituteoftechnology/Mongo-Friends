const router = require('express').Router();

const FriendModel = require('../Models/friendModel');

//pushes the data to the database adding a new friend
router.post('/', function post(req, res) {
  const friendData = req.body;
  const friend = new FriendModel(friendData);
  if(friend.firstName === null || friend.lastName === null || friend.age === null) {
    res.status(400).json({errorMessage: "Please provide first name, last name and age for the friend"});
} else if(friend.age < 1 || friend.age > 120 || friend.age === NaN) {
    res.status(400).json({errorMessage: "Age must be a number between 1 and 120"});
}
  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(errorMessage => {
      res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
    });
});

//gets all the friends from the database
router.get('/', function get(req, res) {
  FriendModel.find().then(friends => {
    res.status(200).json(friends);
  })
  .catch(errorMessage => {
    res.status(500).json({ errorMessage: "The friends information could not be retrieved" });
  });
});

// gets a specific friend from the database
router.get('/:id', (req, res) => {
  const { id } = req.params;
    FriendModel.findById(id)
    .then(friends => {
        if(friends) {
            res.status(200).json(friends);
        } else {
            res.status(404).json({ errorMessage: "The friend with the specified ID does not exist"})
        }
      
    })
    .catch(errorMessage => res.status(500).json({ errorMessage: "The friend information could not be retrieved." }));
});

// removes a friend from the database
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  FriendModel.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      }
    })
    .catch(errorMessage => res.status(500).json({ errorMessage: "The friend could not be removed" }));
});


//updates a friend in the database
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateFriend = req.body;
  const friend = new FriendModel(friendData);
  const options = {
    new: true,
  };

  if(friend.firstName === null || friend.lastName === null || friend.age === null) {
    res.status(400).json({errorMessage: "Please provide first name, last name and age for the friend"});
} else if(friend.age < 1 || friend.age > 120 || friend.age === NaN) {
    res.status(400).json({errorMessage: "Age must be a number between 1 and 120"});
}

  FriendModel.findByIdAndUpdate(id, updateFriend, options)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      }
    })
    .catch(errorMessage => res.status(500).json({ errorMessage: "The friend information could not be modified." }));
});

module.exports = router;