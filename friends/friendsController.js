const router = require('express').Router()
const Friend = require('./friendsModel')

router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then( friends => {
                res.status(200).json(friends)
            })
            .catch( err => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body
        const newFriend = Friend({ firstName, lastName, age })
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        } else if (isNaN(age) || age<1 || age>120) {
            res.status(400).json( { errorMessage: "Age must be a number between 1 and 120" })
        } else {
            newFriend.save()
                .then( friend => {
                    res.status(201).json(friend)
                })
                .catch( err => {
                    res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
                })
        }
    })


module.exports = router;
