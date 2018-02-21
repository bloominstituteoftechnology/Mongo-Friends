const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Friend = require('./friends/FriendModel.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
	res.status(200).json({status: 'API Running'});
});

server.post('/api/friends', (req, res) => {
	const friendInformation = req.body;

	if (!friendInformation.firstName || !friendInformation.lastName || !friendInformation.age) {
		res.status(400).json({
			errorMessage: 'Please provide firstName, lastName and age for the friend.'
		})
	} else if (friendInformation.age < 1 || friendInformation.age > 120 || !Number.isInteger(friendInformation.age)) {
		res.status(400).json({
			errorMessage: 'Age must be a whole number between 1 and 120.'
		})
	} 

	const friend = new Friend(friendInformation);

	friend.save()
		.then((newFriend) => {
			res.status(201).json(newFriend);
		})
		.catch((error) => {
			res.status(500).json({
				error: 'There was an error while saving the friend to the database.'
			})
		});
});

server.put('/api/friends/:id', (req, res) => {
	const friendInformation = req.body;
	const id = req.params.id;
	if (!friendInformation.firstName || !friendInformation.lastName || !friendInformation.age) {
		res.status(400).json({
			errorMessage: 'Please provide firstName, lastName and age for the friend.'
		})
	} else if (friendInformation.age < 1 || friendInformation.age > 120 || !Number.isInteger(friendInformation.age)) {
		res.status(400).json({
			errorMessage: 'Age must be a whole number between 1 and 120.'
		})
	} else {
		const friend = new Friend(friendInformation);

		Friend.findByIdAndUpdate(id, friendInformation)
			.then((newFriend) => {
				res.status(201).json(newFriend);
			})
			.catch((error) => {
				res.status(404).json({
					error: 'The friend information could not be modified.'
				})
			});
	}
});

server.get('/api/friends', (req, res) => {
	Friend.find({})
		.then((friends) => {
			res.status(200).json(friends);
		})
		.catch(() => {
			res.status(500).json({
				error: 'The information could not be retrieved.'
			});
		});
});

server.get('/api/friends/:id', (req, res) => {
	const { id } = req.params;

	Friend.findById(id)
		.then((friend) => {
			res.status(200).json(friend);
		})
		.catch((error) => {
			res.status(404).json({
				error: 'The friend with the specified ID does not exist.'
			});
		});
});



server.delete('/api/friends/:id', (req, res) => {
	const { id } = req.params;

	Friend.findByIdAndRemove(id)
		.then((friend) => {
			res.status(200).json(friend);
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The friend could not be removed.'
			});
		});
});

const port = process.env.PORT || 5005;

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost:27017/friends')
	.then(() => {
		server.listen(port, () => {
			console.log('Successfully connected to MogoDB');
		});
	})
	.catch((error) => {
		console.log('Database connection failed.');
	});