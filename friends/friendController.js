const router = require('express').Router();

const Friends = require('./friendModel');

router
    .route('/')
    .post((req, res) => {
        const { firstName, lastName, age, createdOn } = req.body;
        const newFriend = new Friends({ firstName, lastName, age, createdOn });
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
            return;
        } else if (typeof age !== 'number' || age < 1 || age > 120) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
            return;
        } else {
            newFriend.save()
                .then(friend => {
                    res.status(201).json(friend)
            })
                .catch(err => {
                    res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
                })
        }
    })

module.exports = router;