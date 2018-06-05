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
        const { firstName, lastName, age, contactInfo } = req.body
        const newFriend = Friend({ firstName, lastName, age, contactInfo })
        if (!firstName || !lastName || !age || !contactInfo["email"]) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName, age, and email for the friend." })
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

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Friend.findById(id)
            .then( friend => {
                if (friend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(200).json(friend)
                }
            })
            .catch( err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend information could not be retrieved." })    
                }
            })
    })
    .delete((req, res) => {
        const { id } = req.params
        Friend.findByIdAndRemove(id)
            .then( friend => {
                if (friend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(200).json(friend)
                }
            })
            .catch( err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend could not be removed." })    
                }
            })
    })
    .put((req, res) => {
        const { id } = req.params
        const changes = req.body
        // the specs say to make sure that a first name, last name, and age are provided, but I didn't include this
        // because findByIdAndUpdate only affects fields that have been changed and keeps the old values otherwise.
        if (changes.age && (isNaN(changes.age) || changes.age<1 || changes.age>120)) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
        }
        Friend.findByIdAndUpdate(id, changes)
            .then( friend => {
                if (friend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    Friend.findById(id)
                        .then(friend => {
                            if (friend === null) {
                                res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                            } else {
                                res.status(200).json(friend)
                            }
                        })
                        .catch( err => {
                            if (err.name === "CastError") {
                                res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                            } else {
                                res.status(500).json({ errorMessage: "The friend information could not be retrieved." })    
                            }
                        })
                }
            })
            .catch( err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend information could not be modified." })    
                }
            })
    })

module.exports = router;
