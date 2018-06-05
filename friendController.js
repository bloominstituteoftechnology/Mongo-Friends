const router = require('express').Router();
const Friend = require('./friendModel');

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
};

router
    .route('/')
    .get((req, res) => {
        Friend.find()
        .then(friends => {
            res.status(200).json({ friends })
        })
        .catch(err => res.status(500).json({ errorMessage: "The friends information could not be retrieved." }))
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        if (!firstName || !lastName) {
            sendUserError(400, "Please provide firstName, lastName, and age for the friend.", res)
        } else if (typeof age !== 'number' || age > 120 || age < 1) {
            sendUserError(400, "Age must be a number between 1 and 120", res)
        } else {
            newFriend
                .save()
                .then(savedFriend => {
                    res.status(201).json({ savedFriend })
                })
                .catch(error => {
                    sendUserError(500, "There was an error while saving the friend to the database.", res)
                })
        }
    })


module.exports = router;