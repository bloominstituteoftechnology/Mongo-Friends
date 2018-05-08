// define a schema for a sub document that captures a user's contact info
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// required properties for a contact info document
// email, mobile number, github username, facebook username, twitter handle

const contactForm = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		mobileNumber: {
			type: String,
			required: true
		},
		githubUsername: {
			type: String,
			required: true
		},
		facebookUsername: {
			type: String,
			required: true
		},
		twitterHandle: {
			type: String,
			required: true
		}
	},
	options
);

const options = {
	timestamps: true
};

module.exports = contactForm;
