const router = require('express').Router();
const Friend = require('./friendModel.js');

router
	.route('/')
	.get((req, res) => {
		Friend.find({})
			.then(friends => res.status(200).json(friends))
			.catch(error =>
				res.status(500).json({
					errorMessage: 'The friends information could not be retrieved.',
				})
			);
	})
	.post((req, res) => {
		const friend = new Friend(req.body);
		//check for first last age
		//check age

		friend
			.save()
			.then(saved => res.status(201).json(saved))
			.catch(error =>
				res.status(500).json({
					errorMessage:
						'There was an error while saving the friend to the database.',
				})
			);
	});

router
	.route('/:id')
	.get((req, res) => {
		Friend.findById(req.params.id)
			//404 if not found
			.then(friend => res.status(200).json(friend))
			.catch(error =>
				res.status(500).json({
					errorMessage: 'The friend information could not be retrieved.',
				})
			);
	})
	.delete((req, res) => {
		Friend.findById(req.params.id)
			//404 if not found
			.then(friend => {
				Friend.remove(friend)
					.then(friend => res.status(200).json(friend))
					.catch(error =>
						res
							.status(500)
							.json({ errorMessage: 'The friend could not be removed' })
					);
			})
			.catch(error =>
				res.status(500).json({
					errorMessage: 'The friend information could not be retrieved.',
				})
			);
	})
	.put((req, res) => {
		const newFriend = new Friend(req.body);
		//check for first last age
		//check age

		Friend.findById(req.params.id)
			//404 if not found
			.then(oldFriend => {
				Friend.replaceOne(oldFriend, newFriend)
					.then(res.status(200).json(newFriend))
					.catch(error =>
						res.status(500).json({
							errorMessage: 'The friend information could not be modified.',
						})
					);
			})
			.catch(error =>
				res.status(500).json({
					errorMessage: 'The friend information could not be retrieved.',
				})
			);
	});

module.exports = router;
