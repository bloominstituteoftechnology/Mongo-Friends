const router = require('express').Router();

const Friend = require('./friendModel.js');

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
}

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                return sendUserError(500, err, res);
            });
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        if (!firstName || !lastName || !age) return sendUserError(400, `Please provide firstName, lastName and age for the friend.`, res);
        if (age < 1 || age > 120) return sendUserError(400, `Age must be a number between 1 and 120`, res);
        
        const newFriend = new Friend({ firstName, lastName, age });
        newFriend
            .save()
            .then(response => {
                res.status(201).json(response);
            })
            .catch(err => {
                return sendUserError(500, err, res);
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend
            .findById(id)
            .then(response => {
                if(response === null) return sendUserError(404, `The friend with the ID ${id} does not exist`, res);
                res.json(response);
            })
            .catch(err => {
                return sendUserError(500, err, res);
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend
            .findByIdAndDelete(id)
            .then(response => {
                if(response === null) return sendUserError(404, `The friend with the ID ${id} does not exist`, res);
                res.json(response);
            })
            .catch(err => {
                return sendUserError(500, err, res);
            });
    })
    .put((req, res) => {
        const { id } = req.params;
        const updatedFriend = ({ firstName, lastName, age } = req.body);
        Friend
            .findByIdAndUpdate(id, updatedFriend, {new: true})
            .then(response => {
                if(response === null) return sendUserError(404, `The friend with the ID ${id} does not exist`, res);
                res.json(response);
            })
            .catch(err => {
                return sendUserError(500, err, res);
            });
    });
    

module.exports = router;