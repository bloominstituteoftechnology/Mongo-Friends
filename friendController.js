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
        const { firstName, lastName, age, contactInfo } = req.body;
        const newFriend = new Friend({ firstName, lastName, age, contactInfo });
        if (!firstName || !lastName || !age) {
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

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then(foundFriend => {
                if (foundFriend !== null) {
                res.status(200).json({ foundFriend })
            } else {
                sendUserError(404, "This friend is no longer in our database.", res)
            }})
            .catch(err => {
                sendUserError(500, "The friends information could not be retrieved.", res)
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend.findByIdAndRemove(id)
            .then(deletedFriend => {
                if (deletedFriend !== null) {
                res.status(200).json({ deletedFriend })
            } else {
                sendUserError(404, "This friend is no longer in our database and could not be removed.", res)
            }})
            .catch(err => {
                sendUserError(500, "The friend could not be removed.", res)
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ firstName, lastName, age, contactInfo } = req.body);
        if (!firstName || !lastName) {
            sendUserError(400, "Please provide firstName, lastName, and age for the friend.", res)
        } else if (typeof age !== 'number' || age > 120 || age < 1) {
            sendUserError(400, "Age must be a number between 1 and 120", res)
        } else {
             Friend.findByIdAndUpdate(id, updates, { new: true })
                .then(updatedFriend => {
                    res.status(200).json({ updatedFriend })
                })
                .catch(err => {
                    sendUserError(500, "The friend information could not be modified.", res)
                })
        }
       
    })


module.exports = router;