const express = require('express');

const Friend = require('./FriendModel.js');

const friendsRouter = express.Router();

// // /api/friends
// bearsRouter.post('/', function(req, res) {
//     const bearInfo = req.body;
//     const bear = new Bear(bearInfo);
//     bear
//     .save()
//     .then(savedBear => {
//         if (!bearInfo.species || !bearInfo.latinName) {
//             res.status(400).json({ errorMessage: "Please provide both species and latinName for the Bear." });
//         }
//         res.status(201).json(savedBear);
//     })
//     .catch(err => {
//         res.status(500).json({ msg: 'error creating a bear', error: err });
//     });
// });

// bearsRouter.get('/', function(req, res) {
//   Bear.find({})
//     .then(bears => {
//       res.status(200).json(bears);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The information could not be retrieved." });
//     });
// });

// bearsRouter.get('/:id', function(req, res) {
//     const { id } = req.params;
//     Bear.findById(id, (err, bear)=> {
//         if (!bear) res.status(404).json({
//             msg: 'The bear with the specified ID does not exist',
//             error: err,
//         });
//         if (err) res.status(500).json({ error: "The information could not be retrieved." });
//         res.status(201).json(bear);
//     });
// });

// bearsRouter.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     Bear.findByIdAndRemove(id, (err, deletedBear) => {
//         if (!deletedBear) res.status(404).json({
//             message: 'The bear with the specified ID does not exist',
//             error: err,
//         });
//         if (err) res.status(500).json({ error: "The Bear could not be removed" });
//         res.status(201).json(deletedBear);
//     });
// });

// bearsRouter.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const bear = req.body;
//     Bear.findByIdAndUpdate(id, bear, {new: true}, (err, updatedBear) => {
//         if (!updatedBear) res.status(404).json({
//             message: 'The bear with the specified ID does not exist',
//             error: err,
//         });
//         if (err) res.status(500).json({ error: "The Bear information could not be modified." });
//         res.status(201).json(updatedBear);
//     });
// });

module.exports = friendsRouter;
