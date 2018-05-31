const router = require('express').Router();

const Friend = require('./FriendModel');

function error(params) {

}

router
.route('/')
.get(get)
.post(post);

// router
//     .route('/:id')
//     .get((req, res) => {
//         const objId = req.params.id;
//         Bear.findById(objId)
//             .then(bear => {
//                 if (bear) {
//                     res.status(201).json({ bear })
//                 } else {
//                     return res.status(404).json({
//                         message: "The bear with the specified ID does not exist."
//                     })
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({ errorMessage: "The bear information could not be retrieved.", err })
//             })
//     })
//     .delete((req, res) => {
//         const objId = req.params.id;
//         Bear.findByIdAndDelete(objId)
//             .then(deleted => {
//                 if (deleted) {
//                     res.status(201).json({ message: "You've deleted the bear", objId })
//                 } else {
//                     return res.status(404).json({
//                         message: "The bear with the specified ID does not exist."
//                     })
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     errorMessage: "The bear could not be removed", err
//                 })
//             })
//     })
//     .put((req, res) => {
//         const { id } = req.params;
//         const updatedBear = req.body;
//         Bear.findByIdAndUpdate(id, updatedBear)
//             .then((updated => {
//                 if (updated) {
//                     res.status(200).json({ updatedBear })

//                 } else {
//                     return res.status(404).json({
//                         message: "The bear with the specified ID does not exist."
//                     })
//                 }
//             }))
//             .catch(err => {
//                 res.status(500).json({
//                     errorMessage: "The bear could not be updated", err
//                 })
//             })
//     })



function get (req, res) {
    Friend.find().then( friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ message: "Friends could not be retrieved", err});
    })
}

function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);

    if (!friendData.firstName || !friendData.lastName || !friendData.age) {
        return res.status(400).json({
            errorMessage: "Please provide the name, last name, and age for the homie."
        })
    }
    friend
        .save().then(friend => {
            res.status(201).json(friend)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving our friend to the database" });
        });
}

module.exports = router;