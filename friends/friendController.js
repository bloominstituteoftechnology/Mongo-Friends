const router = require('express').Router();
const Friend = require('./friendModel');

const errorMessage = (code, message, res) => {
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
        .catch(error => {
            errorMessage(500, 'The friends information could not be retrieved.', res)
        })
    })

    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend ({ firstName, lastName, age});

        if(!firstName || !lastName || !age) {
            errorMessage(400, 'Please provide the first name, last name, and age.', res);
        } else if(typeof age !== number || age < 1 || age > 120) {
            errorMessage(401, 'Age must be between 1 and 120', res)
        } else {
            newFriend
                .save()
                .then(addFriend => {
                    res.status(201).json({ addFriend });
                })
                .catch(error => {
                    errorMessage(500, 'There was an error while we were saving to the database.', res)
                })
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then(idFriend => {
                if (idFriend !== null) {
                    res.status(200).json({ idFriend });
                } else {
                    errorMessage(404, 'Friend is not in this database.', res)
                }
            })
            .catch(error => {
                errorMessage(500, 'This informatino could not be retrieved.', res);
            });
    })

    .delete()
        const { id } = req.params;
        Friend.findByIdAndRemove(id)
            .then(deleteFriend => {
                if (deleteFriend !== null) {
                    res.status(200).json({ deleteFriend });
                } else {
                    errorMessage(404, 'This friend does not exist and cannot be deleted.', res);
                }
            })
            .catch(error => {
                errorMessage(500, 'Internal server error; could not delete friend from database.', res);
            })
    
    .put((req, res) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        if(!firstName || !lastName) {
            errorMessage(400, 'Please enter first name, last name, and age.', res)
        } else if (typeof age !== number || age < 1 || age > 120) {
            errorMessage(400, 'Age must be a number between 1 and 120.', res)
        } else {
            Friend.findByIdAndUpdate(id, { firstName, lastName, age }, { new: true })
                .then(updateFriend => {
                    res.status(200).json({ updateFriend });
                })
                .catch(error => {
                    errorMessage(500, 'This information could not be modified.', res);
                })
        }
    })

    module.exports = router;