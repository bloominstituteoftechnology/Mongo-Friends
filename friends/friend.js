const router = require('express').Router();

const Friend = require('./friendModel');

// POST/Create New Friend
router.post('/', (req, res) => {
    const friendData = req.body;
    const friend = new Friend(friendData);

    friend
        .save()
        .then(friend => {
            if (friend) {
                res.status(201).json(friend);
              } else {
                res.status(400).json({ msg: 'Please provide firstName, lastName and age for the friend.'});
              }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// GET/Read Friend
router.get('/', function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    friend.findById(id)
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Friend.findByIdAndRemove(id)
        .then(friend => {
            if (friend) {
                res.status(204).end();
              } else {
                res.status(404).json({ msg: 'Friend Not Found' });    
            }
        })
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    const options = {
        new: true,
    };

    Friend.findByIdAndUpdate(id, update, options)
        .then(friend => {
            if (friend) {
                res.status(200).json(friend);
              } else {
                res.status(404).json({ msg: 'Friend Not Found' });
              }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;