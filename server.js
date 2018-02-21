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

	const friend = new Friend(friendInformation);
	friend.save()
		.then((newFriend) => {
			res.status(201).json(newFriend);
		})
		.catch((error) => {
			res.status(500).json({
				error: 'There was an error while saving the Friend to the Database.'
			})
		});
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
			res.status(500).json({
				error: 'The information could not be retrieved.'
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