const router = require('express').Router();
const Friend = require('./friendModel');

const errorMessage = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
};

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(friends => {
                res.status(200).json({ friends })
            })
            .catch(error => {
                res.status(500).json({ error: 'Oops something wrong to our bd.'})
            })
    })

    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend ({ firstName, lastName, age });

        if(!firstName || !lastName || !age) {
            errorMessage(400, 'Please provide your information.', res);
        } 
        if(age < 1 || age > 120) {
            errorMessage(400, 'Please enter age between 1 to 120', res)
        } 
        
        newFriend
            .save()
            .then(newFriend => {
                res.status(201).json({ newFriend })
            })
            .catch(error => {
                errorMessage(500, 'Oops something wrong with our server.', res);
            })
        })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend
            .findById(id)
            .then(foundFriend => {
                if(!foundFriend) {
                    errorMessage(404, 'No friend with this id found.', res);
                }
                res.status(200).json({ foundFriend })
            })
            .catch(error => {
                errorMessage(500, 'Oops something wrong with our server.', res);
            })
    })

    .delete((req, res) => {
        const { id } = req.params;
        Friend
            .findByIdAndRemove(id)
            .then(deletedFriend => {
                if(!deletedFriend) {
                    errorMessage(404, 'No friend with this id found.', res);
                }
                res.status({ deletedFriend })
            })
            .catch(error => {
                errorMessage(500, 'Oops something wrong with our server.', res);
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;

        if(!firstName || !lastName || !age) {
            errorMessage(400, 'Please provide your information.', res);
        } 
        if(age < 1 || age > 120) {
            errorMessage(400, 'Please enter age between 1 to 120', res)
        } 

        Friend
            .findByIdAndUpdate(id, {firstName, lastName, age })
            .then(updatedFriend => {
                if(!updatedFriend) {
                    errorMessage(404, 'No friend with this id found.', res);
                }
                res.status(202).json({ updatedFriend })
            })
            .catch(error => {
                errorMessage(500, 'Oops something wrong with our server.', res);
            })
    })


module.exports = router;