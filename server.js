const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();

const Friend = require('./Friends/FriendModel');

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get('/', function(req, res) {
	res.status(200).json({ status: 'API Running' });
});

// API endpoints go here
server.post('/api/friends', function(req, res) {
	const friendInfo = req.body;
	const firstName = friendInfo.firstName;
	const lastName = friendInfo.lastName;
	const age = friendInfo.age;

	if (age < 1 || age > 120) {
		res.status(500).json({ errorMessage: 'Please enter an age between 1 and 120.' });
	} else if (firstName && lastName && age) {
		const friend = new Friend(friendInfo); // mongoose document
		friend
			.save() // returns a Promise
			.then((savedFriend) => {
				res.status(201).json(savedFriend);
			})
			.catch((error) => {
				res.status(500).json({
					error: 'There was an error while saving the Friend to FriendBook.'
				});
			});
	} else {
		res.status(500).json({
			errorMessage: 'Please provide firstName, lastName, and age for your Friend.'
		});
	}
});

server.get('/api/friends', function(req, res) {
	Friend.find({})
		.then((friends) => {
			res.status(200).json(friends);
		})
		.catch((error) => {
			res.status(500).json({ error: 'The information could not be retrieved.' });
		});
});

server.get('/api/friends/:id', function(req, res) {
	const id = req.params.id;

	Friend.findById(id)
		.then((friend) => {
			if (friend) {
				res.status(200).json(friend);
			} else {
				res.status(404).json({ message: 'Not found' });
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: 'The friend information could not be retrieved.',
				error
			});
		});
});

server.delete('/api/friends/:id', function(req, res) {
	const id = req.params.id;

	Friend.findByIdAndRemove(id)
		.then((friend) => {
			if (friend) {
				res.json({message: `Deleted: \n ${friend}`});
			} else {
				res.status(404).json({ message: `The friend with ID: ${error.value} does not exist.` });
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: 'The friend could not be removed.'
			});
		});
});

server.put('/api/friends/:id', function(req, res) {
	const {id} = req.params;
	const {firstName, lastName, age} = req.body;

	if (age < 1 || age > 120) {
		res.status(500).json({ errorMessage: 'Please enter an age between 1 and 120.' });
	} else if (firstName && lastName && age) {
	Friend.findByIdAndUpdate(id, req.body, {new: true})
		.then(friend => {
			res.json(friend);
		})
		.catch(error => {
			if(error.name === 'CastError') {
				res.status(404).json({ message: `The friend with ID: ${error.value} does not exist.`});
			}
			res.status(500).json({error: 'The friend information could not be modified.'});
		});
	}
});

mongoose
	.connect('mongodb://localhost/FriendBook')
	.then((db) => {
		console.log(`Successfully connected to the ${db.connections[0].name} database`);
	})
	.catch((error) => {
		console.error('Database Connection Failed');
	});

const port = process.env.PORT || 5005;
server.listen(port, () => {
	console.log(`API running on http://localhost:${port}.`);
});
