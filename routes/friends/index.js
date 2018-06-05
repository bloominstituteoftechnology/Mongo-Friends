const friends = require('express').Router();

// Requests
const createFriend = require('./createFriend');
const deleteFriend = require('./deleteFriend');
const getAllFriends = require('./getAllFriends');
const getSingleFriend = require('./getSingleFriend');
const updateFriend = require('./updateFriend');

// Routes
friends.post('/', createFriend);
friends.get('/', getAllFriends);
friends.get('/:id', getSingleFriend);
friends.put('/:id', updateFriend);
friends.delete('/:id', deleteFriend);

module.exports = friends;