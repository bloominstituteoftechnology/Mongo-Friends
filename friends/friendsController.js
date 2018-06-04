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
                console.log(err)
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(500).json({ errorMessage: "The friend could not be removed." })    
                }
            })
    })

module.exports = router;
