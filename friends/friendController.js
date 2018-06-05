const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.json(friends);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching friends' }));
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
            res.status(500).json({ error: 'No friend by that id in DB' });
        })
    })
    .put((req, res) => {
        const { id } = req.params;
        const friend = ({ firstName, lastName, age, contactInfo } = req.body);
        Friend.findByIdAndUpdate(id, friend)
        .then(friend => {
            if (friend === null) {
                res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
            } else {
                Friend.findById(id)
                .then(foundFriend => {
                    res.json(foundFriend);
                })
                .catch(err => {
                    res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error updating the DB' });
        })
    });

module.exports = router;