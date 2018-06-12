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


module.exports = router;