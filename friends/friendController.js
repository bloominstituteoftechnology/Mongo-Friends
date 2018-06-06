const router = require('express').Router();
const Friend = require('./friendModel.js');


router
	.route('/')
	.get((req, res) => {
		console.log(Friend.find);
		Friend.find()
			.then(friends => {
				res.status(200).json(friends);
  			})
			.catch(err => res.status(500).json({ error: "The information could not be retrieved."	}))
	})

	.post((req, res) => {
		const { firstName, lastName, age } = req.body
		const newFriend = new Friend({ firstName, lastName, age });
		if (!req.body.firstName || !req.body.lastName || !req.body.age) {
			res.status(400).json({ error: "Please provide first name, last name, and age for your friend."});
// all 3 fields are required
		} else if (typeof age !=='number' || age < 1 || age > 120) {
			res.status(400).json({ error: "Age must be a number between 1 and 120." });
		}
// make sure age is actually a number AND that it is between 1 and 120		
		else {
			newFriend.save()
				.then(Friend => {
					res.status(201).json({ Friend });
				})
				.catch(err => res.status(500).json({ error: "There was an error saving the friend to the database." }))
		}
	})
router
	.route('/:id')
	.get((req, res) => {
	const { id } = req.params;
		Friend.findById(id)
			.then(foundFriend => {
				if (!foundFriend) {
					res.status(404).json({ error: "The friend with the specified ID could not be retrieved." });
				}
				else {
					res.status(200).json(foundFriend);
				}
			})
	  		.catch(err => res.status(500).json({ error: "There was an error retrieving your friend." }));
	})
// I tried to do a better job of getting the 404 and 500 messages for this project - yesterday I spent so much time figuring out why my thing wasn't working (it was a missing "s") that I didn't get this quite right.

	.delete((req, res) => {
		const { id } = req.params;
		Friend.findByIdAndRemove(id)
			.then(removeFriend => {
				if (removeFriend) {
					res.status(200).json(removeFriend);
				}
				else {
					res.status(404).json({ error: "The friend with the specified ID could not be found."});
				}
			})
			.catch(err => res.status(500).json({ error: "There was an error retrieving your friend."}));
	})

	.put((req, res) => {		
		const { id } = req.params;
		const { firstName, lastName, age } = req.body;

		if (!firstName || !lastName || !age) {
			res.status(400).json({ error: "Please provide first name, last name, and age for your friend." });
		} else if (typeof age !=='number' || age < 1 || age > 120) {
			res.status(400).json({ error: "Age must be a number between 1 and 120." });
		}
// make sure people are entering the right stuff whenever they are adding or updating records
		else {
			Friend.findByIdAndUpdate(id, { firstName, lastName, age }, { new: true })
// It seems that mongoose will return the original document rather than the new one unless you specifically ask it to return the new one. The default setting is { new: false } for whatever reason.
				.then(updatedFriend => {
					res.status(200).json(updatedFriend);
				})
				.catch(err => res.status(500).json({ errorMessage: "There was an error updating your friend's information."}));
		}
	})
	
module.exports = router;
	
