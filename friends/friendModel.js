const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	age: { type: Number, required: true, min: 1, max: 120 },
	createdOn: { type: Date, required: true, default: Date.now },
});

const friendModel = mongoose.model('friend', friendSchema);

module.exports = friendModel;
