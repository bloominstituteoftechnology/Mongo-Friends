const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Friend = require('./models/friendModel.js');

const server = express();

server.get('/', function(req, res) {
    res.status(200).json({ status: 'API Running' });
});

server.get('/api/friends', (req, res) => { // get whole list
    Friend.find({})
    .then(friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ error: "Cannot retrieve the information" });
    })
});

server.post('/api/friends', (req, res) => {
const { firstName, lastName, createdOn, age
} = req.body;
if ( !firstName || !lastName || !age ) {
    res.status(400).json({ error: "Please provide first name, last name, and age for the friend." });
}
if (age < 1 || age > 120) {
    res.status(400).json({ error: "Age must be an integer between 1 and 120."})
    if (age % 1 !== 0) {
        res.status(400).json({ error: "Age must be a whole number!"})
    }
    
}
const friend = new Friend({ firstName, lastName, createdOn, age });
friend.save()
.then(savedFriend => {
    res.status(201).json(savedFriend);
})
.catch(err => {
    res.status(500).json({ errorMessage: "There was an error while saving the Bear to the Database" });
})

});

// server.get('/api/friends', (req, res) => {
//     const { id } = req.params // get by ID
// });

// server.put('/api/friends') // to edit the friend




mongoose.connect('mongodb://localhost/store')
    .then(conn => {
      console.log('Successfully Connected to MongoDB');
    })
    .catch(err => {
      console.log('Database connection failed');
    }
  );

  const port = process.env.PORT || 5005;
  server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});