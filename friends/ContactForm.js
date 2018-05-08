const router = require("express").Router();
// parent document
const Friend = require("./friendModel");
// sub document
const ContactForm = require("./friendModel");

router
	.route("/:id")
	.get((req, res) => {
		const { id } = req.params;

		Friend.findById(id)
			.then(friend => {
				if (!friend) {
					res.status(404).json({
						message: "The friend with the specified ID does not exist."
					});
				} else {
					// return a friend's form data
					res.status(200).json(friend.contactForm);
				}
			})
			.catch(err => {
				res.status(500).json({
					errorMessage: "The friend information could not be retrieved."
				});
			});
	})
	.post((req, res) => {
		const formData = req.body;
		const { id } = req.params;

		// validate form data
		if (
			!formData.email ||
			!formData.mobileNumber ||
			!formData.githubUsername ||
			!formData.facebookUsername ||
			!formData.twitterHandle ||
			!formData.email.length === 0 ||
			!formData.mobileNumber.length === 0 ||
			!formData.githubUsername.length === 0 ||
			!formData.facebookUsername.length === 0 ||
			!formData.twitterHandle.length === 0
		) {
			res.status(400).json({
				message:
					"Please provide user email, phone number, github, facebook, and twitter usernames"
			});
		} else {
			const form = new ContactForm(formData);
			// find Friend by id
			Friend.findById(id)
				.then(friend => {
					if (!friend) {
						res.status(404).json({
							message: "The friend with the specified ID does not exist."
						});
					} else {
						// add new form data to a user's contact form
						friend.contactForm.push(form);
						friend.markModified("friend.contactForm");
						friend
							.save()
							.then(contact => {
								console.log("contact", contact);
								res.status(201).json(contact);
							})
							.catch(err => {
								res.status(500).json({
									errorMessage:
										"There was an error while saving the friend to the database."
								});
							});
					}
				})
				.catch(err => {
					res.status(500).json({
						errorMessage: "The friend information could not be retrieved."
					});
				});
		}
	});

module.exports = router;
