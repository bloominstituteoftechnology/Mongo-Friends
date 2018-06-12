const router = require('express').Router();

const Friend = require('../friends/friendModel');

//pushes data to db
router.post('/', function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);
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
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
      });
  });

//gets all friends from db
router.get('/', function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    })
    .catch(errorMessage => {
      res.status(500).json({ errorMessage: "The friends information could not be retrieved" })
    });
});

//gets specific friend from db
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

//deletes friend from db
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Friend.findByIdAndRemove(id)
    .then(friend => {
        if (friend) {
            res.status(204).end();
        } else {
            res.status(404).json({message: "The friend with the specified ID does not exist." });
        }
    })
    .catch(errorMessage => res.status(500).json({ errorMessage: "The friend could not be removed" }));
});

//updates friend in db
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

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