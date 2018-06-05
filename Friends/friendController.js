const router = require('express').Router();

const Friend = require('./friendModel');

router
	.route('/')
	.get(get)
	.post(post);

function get(req, res) {
	Friend.find()
		.then(friends => {
			res.status(200).json(friends);
		})
		.catch(err => {
			errorMessage: 'The friends information could not be retrieved.';
		});
}

function post(req, res) {
	const friendData = req.body;

	const friend = new Friend(friendData);
	const { firstName, lastName, age } = friend;
	if (firstName && lastName) {
		if (!isNaN(age) && age >= 1 && age < 120) {
			friend
				.save()
				.then(friend => {
					res.status(201).json(friend);
				})
				.catch(err => {
					res.status(500).json({
						errorMessage:
							'There was an error while saving the friend to the database.',
					});
				});
		} else {
			res
				.status(400)
				.json({ errorMessage: 'Age must be a number between 1 and 120' });
		}
	} else {
		res.status(400).json({
			errorMessage:
				'Please provide firstName, lastName and age for the friend.',
		});
	}
}

router
	.route('/:id')
	.get((req, res) => {
		Friend.findById(req.params.id)
			.then(friend => {
				if (!friend) {
					res.status(404).json({
						error: 'The friend with the specified ID does not exist.',
					});
				} else {
					res.status(200).json(friend);
				}
			})
			.catch(error => {
				res.status(500).json({
					errorMessage: 'The friend information could not be retrieved.',
				});
			});
	})

	.delete((req, res) => {
		Friend.findByIdAndRemove(req.params.id)
			.then(() => {
				if (!friend) {
					res.status(404).json({
						error: 'The friend with the specified ID does not exist.',
					});
				} else {
					res.status(200).json({
						message: `Friend with id ${friend._id} deleted.`,
					});
				}
			})
			.catch(error => {
				res.status(500).json({
					errorMessage: 'The friend information could not be removed.',
				});
			});
	})

	.put((req, res) => {
		Friend.findByIdAndUpdate(req.params.id, req.body)
			.then(() => {
				res.status(200).json({ message: 'Friend info updated' });
			})
			.catch(error => {
				if (err.name === 'CastError')
					res.status(404).json({
						errorMessage:
							'The friend with the specified ID ${err.value} does not exist.',
					});
				else {
					res.status(500).json(err.message);
				}
			});
	});

module.exports = router;
