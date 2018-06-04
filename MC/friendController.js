const router = require('express').Router()
const Friend = require('./friendModel')

router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then(friends => {
                res.status(200).json({ friends })
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age, createdOn } = req.body

        // Checks for bad Userinput
        if (firstName === undefined || lastName === undefined || age === undefined) res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        typeof (age) !== "number" || age > 120 || age < 1 ? res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" }) : null

        const newFriend = new Friend({ firstName, lastName, age, createdOn })

        newFriend.save()
            .then(friend => {
                res.status(201).json(friend)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: err })
            })
    })

router
    .route('/:id')
    .delete((req, res) => {
        const { id } = req.params
        Friend.findByIdAndRemove(id)
            .then(friend => res.status(200).json(friend))
            .catch(err => {
                console.log("deleteerr", err)
                res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
            })
    })
    .put((req, res) => {
        const { id } = req.params
        const { firstName, lastName, age, createdOn } = req.body

        if (firstName === undefined || lastName === undefined || age === undefined) res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        typeof (age) !== "number" || age > 120 || age < 1 ? res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" }) : null
        console.log(age)
        Friend.findByIdAndUpdate(id, { firstName, lastName, age })
            .then(friend => res.status(201).json(friend))
            .catch(err => res.status(500).json(err))
    })
    .get((req, res) => {
        const { id } = req.params
        Friend.findById(id)
            .then(friend => res.status(200).json(friend))
            .catch(err => res.status(400).json(err))
    })

module.exports = router;