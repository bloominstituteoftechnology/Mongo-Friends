const router = require('express').Router();

const Friend = require('./friendModel');

router.post('/', function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);

    friend
        .save()
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

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
})