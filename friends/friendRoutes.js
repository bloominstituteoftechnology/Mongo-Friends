const express = require('express');
const Friend = require('./FriendModel.js');
const friendsRouter = express.Router();

//post a friend
friendsRouter.post('/', function(req, res){
	if(!req.body.firstname || !req.body.lastname || !req.body.age){
		res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
	}
	if(typeof(req.body.age) !== 'number' || req.body.age < 1 || req.body.age > 120){
		res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
	}

	const friendInfo = req.body;
	const friend = new Friend(friendInfo);
	friend.save().then(savedFriend => {
		res.status(201).json(savedFriend)
	}).catch(err => {
		res.status(500).json({ error: "There was an error while saving the friend to the database" });
	});
});

// get request

friendsRouter.get('/', function(req, res){
	Friend.find({})
	.then(friend => {
		res.json(friend);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." })
	});
});

friendsRouter.get('/:id', function(req, res){
	const id = req.params.id;
	Friend.findById(id)
	.then(friend => {
		if (!friend) res.status(404).json({ message: "The friend with the specified ID does not exist." });
		res.json(friend);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." })
	});
});

module.exports = friendsRouter;