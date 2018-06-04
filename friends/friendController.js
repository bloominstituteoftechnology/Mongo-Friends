const router = require('express').Router();

const Friends = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friends.find()
            .then(friends => {
                res.json(friends);
            })
            .catch(error => {
                res.status(500).json({error: 'The friends information could not be retrieved.'})
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age, createdOn } = req.body;
        const newFriend = new Friends ({firstName, lastName, age, createdOn });
        if (!firstName || !lastName || !age) {
            res.status(400).json({error: 'Please provide firstName, lastName and age for the friend.'})
            return;
        }
        if(age < 1 || age > 120) {
            res.status(400).json({error: 'Age must be a number between 1 and 120'})
            return;
        }
        newFriend.save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(error => {
                res.status(500).json({error: 'There was an error while saving the friend to the database.'})
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friends.findById(id) 
            .then(foundFriend => {
                if(foundFriend) {
                    res.json(foundFriend);
                    return;
                } else {
                    res.status(404).json({error: 'The friend with the specified ID does not exist.'})
                }
            })
            .catch(error => {
                res.status(500).json({error: 'The friend information could not be retrieved.'})
            })
    })

    module.exports = router;