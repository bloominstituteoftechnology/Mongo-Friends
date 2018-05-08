const router = require('express').Router();

const Friend = require('./friendModel');

//pushes data to db
router.post('/', function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);
    
    friend
    .save()
    .then(friend => {
        res.status(201).json(friend);
    })
    .catch(err => res.status(500).json(err));
});

//gets all friends from db
router.get('/', function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    });
});

//gets specific friend from db
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Friend.findbyId(id)
    .then(friends=> {
        res.status(200).json(friends);
    })
    .catch(err => res.status(500).json(err));
});

//deletes friend from db
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Friend.findByIdAndRemove(id)
    .then(friend => {
        if (friend) {
            res.status(204).end();
        } else {
            res.status(404).json({msg: 'Friend not found' });
        }
    })
    .catch(err => res.status(500).json(err));
});

