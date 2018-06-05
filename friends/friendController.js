const router = require('express').Router(); 

const Friend = require('./friendModel');

router.post('/', (req, res) => {
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



router.get('/', (req, res) => {
    Friend.find()
        .then(bears => {
            res.status(202).json({ route: '/api/friends/' + req.params });
        })
        .catch(error => {
            res.status(500).json({ error: 'The friends information could not be retrieved.' });
        })
});



module.exports = router;