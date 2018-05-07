const router = require('express').Router();

const Friend = require('./friendModel');

router
	.route('/')
	.get(get)
	.post(post);

function get(req, res) {
	Friend.find().then(friends => {
		res.status(200).json(friends);
	});
}

function post(req, res) {
	const friendData = req.body;

	const friend = new Friend(friendData);

	friend
		.save()
		.then(friend => {
			res.status(201).json(friend);
		})
		.catch(err => {
			res.status(500).json(err);
		});
}

module.exports = router;
