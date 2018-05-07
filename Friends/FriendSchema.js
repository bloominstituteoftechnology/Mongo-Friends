const router = require('express').Router();
const Friend = require('./FriendModel.js');

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
		if (!(req.body.firstName && req.body.lastName && req.body.age))
			res.status(400).json({
				errorMessage:
					'Please provide firstName, lastName and age for the friend.',
			});

		if (
			!(
				req.body.age === Number(req.body.age) &&
				0 < req.body.age &&
				req.body.age < 121
			)
		)
			res
				.status(400)
				.json({ errorMessage: 'Age must be a number between 1 and 120' });
		else {
			const friend = new Friend(req.body);
			friend
				.save()
				.then(saved => res.status(201).json(saved))
				.catch(error =>
					res.status(500).json({
						errorMessage:	'There was an error while saving the friend to the database.',
					})
				);
		}
	});

router
    .route('/:id')
    	.get((req, res) => {
		Friend.findById(req.params.id)
			.then(friend => {
				if (friend === null)
					res.status(404).json({
						message: 'The friend with the specified ID does not exist.',
					});
				else res.status(200).json(friend);
			})
			.catch(error =>
				res.status(500).json({
					errorMessage: 'The friend information could not be retrieved.',
				})
			);
	})
	.delete((req, res) => {
		Friend.findByIdRemove(req.params.id)
			.then(friend => {
				console.log(friend);
				if (friend === null)
					res.status(404).json({
						message: 'The friend with the specified ID does not exist.',
					});
				else res.status(200).json(friend);
			})
			.catch(error =>
				res
					.status(500)
					.json({ errorMessage: 'The friend could not be removed' })
			);
	})
	.put((req, res) => {
		if (!(req.body.firstName && req.body.lastName && req.body.age))
			res.status(400).json({
				errorMessage:
					'Please provide firstName, lastName and age for the friend.',
			});

		if (
			!(
				req.body.age === Number(req.body.age) &&
				0 < req.body.age &&
				req.body.age < 121
			)
		)
			res
				.status(400)
                .json({ errorMessage: 'Age must be a number between 1 and 120' });
                		else {
			Friend.findByIdUpdate(req.params.id, req.body, { new: true })
				.then(updated => {
					if (updated === null)
						res.status(404).json({
							message: 'The friend with the specified ID does not exist.',
						});
					else res.status(200).json(updated);
				})
				.catch(error => {
					res.status(500).json({
						errorMessage: 'The friend information could not be retrieved.',
					});
				});
		}
	});

module.exports = router;