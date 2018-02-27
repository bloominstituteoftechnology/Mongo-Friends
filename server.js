const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

const PORT = process.env.PORT || 5050;

const Friend = require('./Friends/FriendsModel');

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json( {status: "API running"})
});

const getHandler = (collection, req, res) => {
    collection
        .find()
        .then(results => {
            res
            .status(200)
            .json(results);
        })
        .catch(error => {
            res
            .status(500)
            .json({ error: "Could not gather info." });
        });
    return;
};

const getByIdHandler = (collection, req, res, item) => {
    const id = req.params.id;
    collection
        .findById(id)
        .then(result => {
            if (result) {
                res
                .status(200)
                .json(result);
            } else {
                res
                .status(404)
                .json({ message: `The ${itme} with that ID does not exist.` });
            }
        })
        .catch(error => {
            if (error.name === 'CastError') {
                res
                .status(400)
                .json({ message: `The ID ${error.value} is invalid.` });
            }
            res
            .status(500)
            .json({ error: "Could not gather info." });
        });
};

const deleteHandler = (collection, req, res, item) => {
    const id = req.params.id;
    collection.findByIdAndRemove(id)
        .then(results => {
            if (results) {
                res
                .status(200)
                .json(results);
        } else {
            res
            .status(404)
            .json({ message: `The ${item} with that ID does not exist.` });
        }
    })
        .catch(error => { 
            res
            .status(500)
            .json({ error: `The ${item} could not be deleted.` });

    });
};

server.post('/api/friends', (req, res) => {
    const friendInformation = req.body;
    const { firstName, lastName, age } = friendInformation;
    const friend = new Friend(friendInformation);
    if (firstName && lastName && age) {
        if (typeof age !== 'number' || age < 1 || age > 120) {
            res
            .status(400)
            .json({ errorMessage: "Age must be a number between 1 and 120" });

        } else {
            friend
            .save()
            .then(savedFriend => {
                res
                .status(201)
                .json(savedFriend);
            })
            .catch(error => {
                res
                .status(500)
                .json({ errorMessage: "There was an error trying to save friend." });
            });
        }
    } else {
        res
        .status(400)
        .json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    }
});

server.get('/api/frineds', (req, res) => {
    getHandler(Friend, req, res);
});

server.get('/api/friends/:id', (req, res) => {
    getByIdHandler(Friend, req, res, 'friend');
});

server.delete('/api/friends/:id', (req, res) => {
    deleteHandler(Friend, req, res, 'friend');
});

server.put('/api/friends', (req, res) => {
    const friendInformation = req.body;
    const { id, firstName, lastName, age } = friendInformation; 
    if ( id && firstName && lastName && age) {
        if (typeof age !== 'number' || age < 1 || age > 120) {
            res
            .status(400)
            .json({ errorMessage: "Age must be a whole number between 1 and 120" });
        } else {
            const updatedFriend = req.body;
            Friend
            .findByIdAndUpdate( id, updatedFriend, { new: true })
            .then(friend => {
                if (friend) {
                    res
                    .status(200)
                    .json(friend);
                } else {
                    res
                    .status(404)
                    .json({ message: "The friend with the specified ID does not exist."});
                }
            });
        }
    } else {
        res
        .status(400)
        .json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    }
});

mongoose
.connect('mongodb://localhost/FriendFinder')
.then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database`)
})
.catch(error => {
    console.log('Database connection failed');
});

server.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}.`)
});
