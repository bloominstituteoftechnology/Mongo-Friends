const mongoose = require('mongoose');

const definition = {
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	contactInfo: {
		type: Object,
		required: false,
		email: {
			type: String,
			required: false,
		},
		mobile: {
			type: Number,
			required: false,
		},
		github_username: {
			type: String,
			required: false,
		},
		twitter_handle: {
			type: String,
			required: false,
		},
	},
};

const options = {
	timestamps: true,
};

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;
