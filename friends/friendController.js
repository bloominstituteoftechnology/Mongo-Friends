const router = require('express').Router(); 

const Friend = require('./friendModel');

router.route('/').post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend({ firstName, lastName, age });
    newFriend
        .save()
        .then(savedFriend => {
            res.status(201).json(savedFriend);
        })
        .catch(error => {
            res.status(422).json({ error: err });
        });
});



router.route('/').get((req, res) => {
    Friend.find()
        .then(friends => {
            res.status(202).json(friend);
        })
        .catch(error => {
            res.status(500).json({ error: 'The friends information could not be retrieved.' });
        })
});



module.exports = router;