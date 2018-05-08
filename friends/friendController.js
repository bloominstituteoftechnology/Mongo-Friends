const router = require('express').Router();

const Friend = require('./friendModel');

router.route('/').get(get).post(post);

router
    .route('/:id')
    .get((req, res) => {
        // res.status(200).json({ route: '/api/friends/' + req.params.id });
            Friend.findById(req.params.id).then(friends => {
                res.status(200).json(friend);
            })
            .catch(err => {
                res.status(404).json({ message: "The friend with the specified ID does not exist." });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
            })
    })
    .delete((req, res) => {
            Friend.findByIdAndRemove(req.params.id).then(friends => {
                res.status(200).json({ status: 'deleted' });
            })
            .catch(err => {
                res.status(404).json({ message: "The friend with the specified ID does not exist." });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend could not be removed" });
            })
        
    })
    .put(( req, res) => {
            Friend.findByIdAndUpdate(req.params.id).then(friends => {
                res.status(200).json(friend);
            })
            .catch(err => {
                res.status(404).json({ message: "The friend with the specified ID does not exist." });
            })
            .catch(err => {
                res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
            })
            .catch(err => {
                res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend information could not be modified." });
            })
            
       
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
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
        })
        .catch(err => {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
        });
}

module.exports = router;