const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const Friend = require('./Friends/FriendModel');

const server = express();


server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.post('/api/friends', (req, res) => {
    const FriendData = req.body;
    const {firstName, lastName, age} = req.body;

    if (!firstName || !lastName || !age) {
        res.status(400).json({ error: 'Provide first name, last name, and age for friend.' });
    } else if (!Number.isInteger(age) || (age < 1 || age > 120)) {
        res.status(400).json({ error: 'Age must be whole number between 1 and 120' });
    } else {
        const friend = new Friend(FriendData);

        friend.save()
        .then(friendAdded => {
            res.status(201).json(friendAdded);
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error saving friend to database' });
        })
    }
});

server.get('/api/friends', (req, res) => {
    Friend.find()
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(error => {
            res.status(500).json({ error: 'The information could not be retrieved' });
        })
});

server.get('/api/friends/:id', (req, res) => {
    const id = req.params.id;

    Friend.findById(id)
        .then(friend => {
            if(friend) {
                res.status(200).json(friend)
            } else {
                res.status(404).json({ error: 'Friend with that id does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Information could not be retrieved' });
        })
})

server.delete('/api/friends/:id', (req, res) => {
    const id = req.params.id;

    Friend.findByIdAndRemove(id)
        .then(deleteFriend => {
            if (deleteFriend) {
                res.status(200).json(deleteFriend);
            } else {
                res.status(500).json({ error: 'Could not remove friend' });
            }
        })
        .catch(err => res.json(error))
});

server.put('/api/friends/:id', (req, res) => {
    const { id } = req.params.id;
    const {firstName, lastName, age} = req.body;

    if (!firstName || !lastName || !age) {
        res.status(400).json({ error: 'Provide first name, last name, and age for friend.' });
    } else if (!Number.isInteger(age) || (age < 1 || age > 120)) {
        res.status(400).json({ error: 'Age must be whole number between 1 and 120' });
    } else {
        Friend.findByIdAndUpdate(id, req.body)
            .then(updateFriend => {
                if (updateFriend) {
                    res.status(200).json(updateFriend);
                } else {
                    res.status(404).json({ error: 'Friend with ID does not exist' });
                }
            })
        .catch(error => {
            res.status(500).json({ error: 'Friend data could not be modified' });
        })
    }
});

mongoose
.connect('mongodb://localhost/FriendFinder')
.then(db => {
    console.log(`Sucessfully connected to the ${db.connections[0].name} database`);
})
.catch(error => {
    console.error('Database Connection Failed');
})

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}.`);
})