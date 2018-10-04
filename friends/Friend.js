const router = require("express").Router();
const Friend = require("./friendModel");

router
	.route("/")
	.get(get)
	.post(post);

router
	.route("/:id")
	.get((req, res) => {
		const { id } = req.params;

		Friend.findById(id)
			.then(friend => {
				// findById() searches for a document via _id property of type ObjectId
				// and returns a Query object
				// findById(undefined) results in null
				if (!friend) {
					res.status(404).json({
						message: "The friend with the specified ID does not exist."
					});
				} else {
					res.status(200).json(friend);
				}
			})
			.catch(err => {
				res.status(500).json({
					errorMessage: "The friend information could not be retrieved."
				});
			});
	})
	.delete((req, res) => {
		const { id } = req.params;

		Friend.findByIdAndRemove(id)
			.then(friend => {
				if (!friend) {
					res.status(400).json({
						message: "The friend with the specified ID does not exist."
					});
				} else {
					res.status(200).json(friend);
				}
			})
			.catch(err => {
				res
					.status(500)
					.json({ errorMessage: "The friend could not be removed" });
			});
	})
	.put((req, res) => {
		const update = req.body;
		const { id } = req.params;
		const options = {
			new: true // Friend.findByIdAndUpdate() to return updated document (201)
		};

		// validate - update content can not be empty
		if (
			!update.firstName ||
			!update.firstName.length === 0 ||
			!update.lastName ||
			!update.lastName.length === 0 ||
			!update.age
		) {
			res.status(400).json({
				errorMessage:
					"Please provide firstName, lastName and age for the friend."
			});
		}
		// validate age
		if (update.age < 1 || update.age > 120) {
			res
				.status(400)
				.json({ errorMessage: "Age must be a number between 1 and 120" });
		} else {
			Friend.findByIdAndUpdate(id, update, options)
				.then(friend => {
					if (!friend) {
						res.status(404).json({
							message: "The friend with the specified ID does not exist."
						});
					} else {
						res.status(200).json(friend);
					}
				})
				.catch(err => {
					res.status(500).json({
						errorMessage: "The friend information could not be modified."
					});
				});
		}
	});

function get(req, res) {
	Friend.find()
		.then(friends => {
			res.status(200).json(friends);
		})
		.catch(err => {
			res.status(500).json({
				errorMessage: "The friends information could not be retrieved."
			});
		});
}

function post(req, res) {
	const newFriend = req.body;
	// validate - friend must have a firstName, lastName, and age
	if (
		!newFriend.firstName ||
		!newFriend.firstName.length === 0 ||
		!newFriend.lastName ||
		!newFriend.lastName.length === 0 ||
		!newFriend.age
	) {
		res.status(400).json({
			errorMessage: "Please provide firstName, lastName and age for the friend."
		});
	}
	// validate age
	if (newFriend.age < 1 || newFriend.age > 120) {
		res
			.status(400)
			.json({ errorMessage: "Age must be a number between 1 and 120" });
	} else {
		// newFriend data is valid
		// create a new mongoose document with new instance of Friend model
		const friend = new Friend(newFriend);

		friend
			.save()
			.then(friend => {
				res.status(201).json(friend);
			})
			.catch(err => {
				res.status(500).json({
					errorMessage:
						"There was an error while saving the friend to the database."
				});
			});
	}
}

module.exports = router;
