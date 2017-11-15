import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}, 
	createdAt: {
		type: Date,
		defualt: Date.now()
	}
});

export const User = mongoose.model('users', userSchema);