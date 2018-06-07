const router = require('express').Router(); 

const Friend = require('./friendModel');

router.route('/').post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend({ firstName, lastName, age });
    if (!firstName || !lastName || !age) {
        res.status(400).json({ error: 'Please provide firstName, lastName and age for the friend.' })
    } else if (age < 1 || age > 120) { 
        res.status(400).json({error:'Age must be a number between 1 and 120'})
    }
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
            res.status(200).json(friends);
        })
        .catch(error => {
            res.status(500).json({ error: 'The friends information could not be retrieved.' });
        })
});

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
        .then(friends => {
            res.status(404).json({ status: '"The friend with the specified ID does not exist' });
        })
        .catch(err => res.status(500).json(err));
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;

    Friend.findByIdAndRemove(id)
        .then(friends => {
            res.status(404).json({ status: 'The friends with the specified ID does not exist.' });
        })
        .catch(err => res.status(500).json(err));
});

router.route('/:id').put((req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    Friend.findbyIdAndUpdate(id, update, options).then(friends => {
        if (friend) {
            res.status(200).json(friend);
        } else {
            res.status(404).json({ status: 'The friend with the specified ID does not exist' });
        }
    })
        .catch(err => res.status(500).json(err));
});



module.exports = router;