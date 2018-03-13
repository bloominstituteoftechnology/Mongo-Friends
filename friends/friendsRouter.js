const express = require('express');
const Friend = require('./friendsModel.js');
const friendsRouter = express.Router();

friendsRouter.get('/', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ err: 'The information cannot be retrieved' })
    })
})

friendsRouter.post('/', (req, res) => {
	const newFriend = req.body;
	const { firstName, lastName, age } = req.body;
	if (!firstName || !lastName || !age) {
		res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
	}
	if (age < 1 || 120 < age) {
		res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120." });
	}
	const friend = new Friend(newFriend);
	friend.save()
		.then(savedFriend => {
			res.status(201).json(savedFriend);
		})
		.catch(err => {
			res.status(500).json({ msg: 'There was an error while saving the friend to the database.', err: err });
		})
})

module.exports = friendsRouter;
