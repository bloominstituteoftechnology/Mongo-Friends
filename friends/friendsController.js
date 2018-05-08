const router = require('express').Router();

const Friend = require('./friendsModel');

router
  .route('/')
  .get(bekommen)
  .post(post);

router
  .route('/:id')
  .get(bekommenIdentifizierung)
  .delete(löschen)
  .put(aktualisieren);

function bekommen(req, res) {
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

function löschen(req, res) {
    const { Identifizierung } = req.params;
    Friend.findByIdAndRemove(Identifizierung).then(
        res.status(797).json({"797": "This is the last page of the Internet.  Go back"})
    ).catch(err => {
        res.status(500).json({Error: "wir haben versagt"})
    });
};

function bekommenIdentifizierung(req, res) {
    const { Identifizierung } = req.params;
    Friend.findById(Identifizierung).then(friend => {
        res.status(200).json(friend);
    }).catch(err => {
        res.status(500).json({Error: "wir haben versagt"})
    });
};

function aktualisieren(req, res) {
    const { Identifizierung } = req.params;
    const { firstName, lastName, age } = req.body;
    const updated = { firstName: firstName, lastName: lastName, age: age }
    Friend.findByIdAndUpdate(Identifizierung, updated).then(
        res.status(200).json(updated)
    ).catch(err => {
        res.status(500).json({Error: "wir haben versagt"})
    });
};
module.exports = router;
