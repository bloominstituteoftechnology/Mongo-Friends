const express = require('express');
const router = express.Router();
const Friends = require('../data/Friends');

router
    .route('/')
    .get((req, res) => {
        Friends
        .find()
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'The friends information could not be retrieved ' });
        })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = { firstName, lastName, age };
        const friend = new Friends(newFriend);
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
        } else if ((typeof age !== 'number') || (age < 1 || age > 120)) {
            res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120' });
        } else {
            friend
                .save()
                .then(friend => {
                    res.status(201).json(friend);
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: 'There was an error while saving the friend to the database ' });
                });
        }
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        
        Friends.findById(id)
            .then(friend => {
                if(friend === null) {
                    res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.' });
                }
                else {
                    res.status(200).json(friend);
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'The friend information could not be retrieved.' });
            })
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friends.findByIdAndRemove(id)
        .then(removedFriend => {
            res.status(200).json(removedFriend);
        })
        .catch(err => {
            if(err.name === 'CastError') {
                res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.' })
            }
            res.status(500).json({ errorMessage: 'The friend could not be removed ' });
        })
    })
    .put((req, res) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        const updatedFriend = { firstName, lastName, age };
        if (!firstName || !lastName || !age) {
          res
            .status(400)
            .json({
              errorMessage:
                'Please provide firstName, lastName and age for the friend.',
            });
        } else if (typeof age !== 'number' || (age < 1 || age > 120)) {
            res
            .status(400)
            .json({
                errorMessage:
                'Age must be a number between 1 and 120',
            });
            } else {
                Friends.findByIdAndUpdate(id, updatedFriend, {
                runValidators: true,
                new: true,
                })
                .then(friend => {
                    res.status(200).json(friend);
                })
                .catch(err => {
                    if (err.name === 'CastError') {
                    res
                        .status(404)
                        .json({
                        errorMessage:
                            'The friend with the specified ID does not exist.',
                        });
                    }
                    res
                    .status(500)
                    .json({
                        errorMessage:
                        'The friend information could not be modified.',
                    });
                });
            }
    })

module.exports = router;