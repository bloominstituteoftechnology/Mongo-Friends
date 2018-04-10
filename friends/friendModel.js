const mongoose = require('mongoose');

const validator = require('validator');

// const validateEmail = (email => {
//     let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return reg.test(email)
// });

const friendSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true,
		min: 1,
		max: 120
	},
	createdOn: {
		type: Date,
		required: true,
		default: Date.now
	},
	contactInfo: {
		email: {
			type: String,
			validate: [ isEmail, 'Please use a valid email address' ]
		},
		mobile: {
			type: String,
			validate: [ isMobilePhone, 'Please enter a valid phone number' ]
		},
		usernames: {
			github: {
				type: String,
				validate: [ isAlphanumeric, 'Please input a valid github username' ]
			},
			facebook: {
				type: String,
				validate: [ isAlphanumeric, 'Please input a valid facebook username' ]
			},
			twitter: {
				type: String,
				validate: [ isAlphanumeric, 'Please input a valid twitter handle' ]
			}
		}
	}
});


const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;
