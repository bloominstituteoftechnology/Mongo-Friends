const router = require('express').Router();

const Friend = require('../models/friendModel');

router.route('/').get((req, res) => {
    Friend.find({})
})


router.route('/').post((req, res) => {
    const { id } = req.params;
    const friend = new Friend(req.body);

    friend
        .save()
        .then(saved => {
            res.status(200).json(saved);
        })
        .catch(error => {
            if (error === 'Validation Error') res.status(400).json(error.message);
            else
                res.status(500).json({
                    errorMessage:
                        'Please provide firstName, lastName and age for the friend.'
                })
        })
});

router.route('/').get((req, res) => {
    res.status(200).json('HERE YA GO, testing this shit');
});

router.route('/').get((req, res) => {
    const { id } = req.params;
    const post = req.body;

    res.status(200).json(post);
});

router.route('/').delete((req, res) => {
    const post = req.body;
    const { id } = req.params;

    res.status(200).json(`deleted ${post} with id of ${id}`);
});

router.route('/').put((req, res) => {
    const update = req.body;
    const post = req.params;

    res.status(200).json(update);
});

module.exports = router;