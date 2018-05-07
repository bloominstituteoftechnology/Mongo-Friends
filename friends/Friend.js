// Friend Controller
const router = require("express").Router();

const Friend = require("./friendModel");

router
	.route("/")
	.get(get)
	.post(post);

function get(req, res) {
	Friend.find().then(friends => {
		res.status(200).json(friends);
	});
}

function post(req, res) {
	// new friend
	const newFriend = req.body;

	// validate - friend must a valid firstName, lastName, and age
	if (
		!newFriend.firstName ||
		!newFriend.firstName.length === 0 ||
		!newFriend.lastName ||
		!newFriend.lastName.length === 0 ||
		!newFriend.age
	) {
		res.status(400).json({
			message: "Please provide firstName, lastName and age for the friend."
		});
	} else {
		// newFriend data is exists
		// create a new mongoose document with new instance of Friend model
		const friend = new Friend(newFriend);

		friend
			.save()
			.then(friend => {
				res.status(201).json(friend);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
}

module.exports = router;
