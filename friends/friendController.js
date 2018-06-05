const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.json(friends);
      })
      .catch(err => res.status(500).json({ error: 'Error reading the DB' }));
  })
  .post((req, res) => {
    const { firstName, lastName, age, contactInfo } = req.body;
    const newFriend = new Friend({ firstName, lastName, age, contactInfo });
    newFriend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then(foundFriend => {
                if (foundFriend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(200).json(foundFriend);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error reading the DB' });
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend.findByIdAndRemove(id)
        .then(friend => {
            if (friend === null) {
                res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
            } else {
                res.status(200).json(friend);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error updating the DB' });
        })
    })
    .put((req, res) => {
        const { id } = req.params;
        const friend = ({ firstName, lastName, age, contactInfo } = req.body);
        Friend.findByIdAndUpdate(id, friend, {new: true})
        .then(friend => {
            if (friend === null) {
                res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
            } else {
                res.json(friend); 
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error updating the DB' });
        })
    });

module.exports = router;