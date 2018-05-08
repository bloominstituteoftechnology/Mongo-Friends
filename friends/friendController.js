const router = require('express').Router();

const Friend = require('./friendModel');

router.route('/').get(get).post(post);

router
    .route('/:id')
    .get((req, res) => {
        res.status(200).json({ route: '/api/friends/' + req.params.id });
            Friend.findById(req.params.id).then(friends => {
                res.status(200).json(friend);
            })
            .catch(err => {
                res.status(404).json({ message: "The friend with the specified ID does not exist." })
            })
                // Kitten.findById(req.params.kittenId, (err, kitten) => {  
                //     if (err) return res.status(500).send(err)
                //     return res.status(200).send(kitten)
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
            })
    })
    .delete((req, res) => {
        res.status(200).json({ status: 'what' });
    })
    .put(( req, res) => {
        res.status(200).json({ status: 'what' });
    });

function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
    });
}

function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);
    friend
        .save()
        .then(friend => {
            res.status(201).json(friend);
        })
        .catch(err => {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        });
}

module.exports = router;