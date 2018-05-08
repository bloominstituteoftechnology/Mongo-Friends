// Friend Controller
const router = require("express").Router();

const Friend = require("./friendModel");

router
	.route("/")
	.get(get)
	.post(post);

router
	.route("/:id")
	.get((req, res) => {
		// define id
		const { id } = req.params;
		// define query to find a friend by id
		// const query = Friend.findById(id, function(err, friend) {
		// 	// id is valid and friend is found
		// 	if (friend) {
		// 		res.status(200).json(friend);
		// 	}
		// 	// id not found
		// 	if (friend === undefined) {
		// 		res
		// 			.status(404)
		// 			.json({ message: "The friend with the specified ID does not exist." });
		// 	}
		// 	// friend could not be fetched
		// 	if (err) {
		// 		res.status(500).json({
		// 			errorMessage: "The friend information could not be retrieved."
		// 		});
		// 	}
		// });
		Friend.findById(id)
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
	// new friend
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
