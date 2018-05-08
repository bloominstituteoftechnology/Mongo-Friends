const router = require('express').Router();

const Friend = require('./friendsModel');

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get(getter)
  .delete(del)
  .put(update);

function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends);
    });
};

function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);
    friend.save().then(friend => {
        res.status(201).json(friend);
    }).catch(err => {
        res.status(500).json(err);
    });
};

function del(req, res) {
    const { id } = req.params;
    Friend.findByIdAndRemove(id).then(
        res.status(797).json({"797": "This is the last page of the Internet.  Go back"})
    ).catch(err => {
        res.status(500).json({Error: "we fucked up"})
    });
};

function getter(req, res) {
    const { id } = req.params;
    Friend.findById(id).then(friend => {
        res.status(200).json(friend);
    }).catch(err => {
        res.status(500).json({Error: "we fucked up"})
    });
};

function update(req, res) {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const updated = { firstName: firstName, lastName: lastName, age: age }
    Friend.findByIdAndUpdate(id, updated).then(
        res.status(200).json(updated)
    ).catch(err => {
        res.status(500).json({Error: "we fucked up"})
    });
};
module.exports = router;
