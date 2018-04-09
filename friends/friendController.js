const router = require('express').Router();
const Friend = require('./friendModel.js');

router
	.route('/')
	.get((req, res) => {
		Friend.find({})
			.then(friends => res.status(200).json(friends))
			.catch(error => res.status(500).json(error));
	})
	.post((req, res) => {
		const friend = new Friend(req.body);

		friend
			.save()
			.then(saved => res.status(201).json(saved))
			.catch(error => res.status(500).json(error));
	});

router
	.route('/:id')
	.get((req, res) => {
		Friend.findById(req.params.id)
			.then(friend => res.status(200).json(friend))
			.catch(error => res.status(500).json(error));
	})
	.delete((req, res) => {
		Friend.findById(req.params.id)
			.then(friend => {
				Friend.remove(friend)
					.then(friend => res.status(200).json(friend))
					.catch(error => res.status(500).json(error));
			})
			.catch(error => res.status(500).json(error));
	})
	.put((req, res) => {
		const newFriend = new Friend(req.body);

		Friend.findById(req.params.id)
			.then(oldFriend => {
				Friend.replaceOne(oldFriend, newFriend)
					.then(res.status(200).json(newFriend))
					.catch(error => res.status(500).json(error));
			})
			.catch(error => res.status(500).json(error));
	});

module.exports = router;
