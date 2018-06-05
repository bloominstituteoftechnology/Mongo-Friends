const router = require('express').Router();

const Friend = require('./friendsModel');

router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then(friends => {
                if (friends.length === 0) {
                    res.status(404).json({ errorMessage: 'There are no friends in the database.' });
                    return;
                }
                else {
                    res.status(200).json(friends);
                }
            })
            .catch(err => res.status(500).json({ errorMessage: 'The friends information could not be retrieved.' }));
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
            return;
        }
        else if (typeof (age) !== 'number' || age < 1 || age > 120) {
            res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120.' });
            return;
        }
        else {
            const newFriend = new Friend({ firstName, lastName, age });
            newFriend.save()
                .then(savedFriend => {
                    res.status(201).json(savedFriend);
                })
                .catch(err => res.status(500).json({ errorMessage: 'There was an error while saving the friend to the database.' }));
        }
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then(foundFriend => {
                res.status(200).json(foundFriend);
            })
            .catch(err => res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.' }));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend.findByIdAndRemove(id)
            .then(removeFriend => {
                res.json(removeFriend);
            })
            .catch(err => res.status(500).json({ errorMessage: 'The friend could not be removed because the friend with the specified ID does not exist.' }));
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ firstName, lastName, age } = req.body);
        if (!updates.firstName || !updates.lastName || !updates.age) {
            res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
            return;
        }
        else if (typeof (updates.age) !== 'number' || updates.age < 1 || updates.age > 120) {
            res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120' });
            return;
        }
        else {
            Friend.findByIdAndUpdate(id, updates, { new: true })
                .then(updatedFriend => {
                    res.json(updatedFriend)
                })
                .catch(err => res.status(500).json({ errorMessage: 'The friend information could not be modified the friend with the specified ID does not exist.' }))
        }
    });

module.exports = router;