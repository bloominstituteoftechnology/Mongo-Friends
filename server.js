const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const friends = require('./Friends/FriendModel');
const server = express();

server.use(bodyParser.json());

server.post('/api/friends', (req, res) => {
  const { body } = req;
  const friend = new friends(body);
  if (!body) {
    res.status(422);
    res.send(`No body :'( was given`);
  }
  if (
    !body.hasOwnProperty('firstName') ||
    !body.hasOwnProperty('lastName') ||
    !body.hasOwnProperty('age')
  ) {
    res.status(400);
    res.send({
      errorMessage: 'Please provide firstName, lastName and age for the friend.'
    });
  }
  if (typeof body.age != 'number' || 120 < body.age || body.age < 1) {
    res.status(400);
    res.send({ errorMessage: 'Age must be a whole number between 1 and 120' });
  } else {
    friend
      .save()
      .then(savedFriend => {
        res.status(201);
        res.send({ Success: 'New Friend was added successfuly', savedFriend });
      })
      .catch(failed => {
        res.status(500);
        res.send({
          error: 'There was an error while saving the friend to the database'
        });
      });
  }
});

server.get('/api/friends', (req, res) => {
  friends
    .find({})
    .then(friends => {
      res.status(201);
      res.send(friends);
    })
    .catch(failed => {
      res.status(500);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/friends/:id', (req, res) => {
  let { id } = req.params;

  if (!id) {
    res.status(422);
    res.send(`No 'ID' No Entry.  >:(`);
  }

  friends
    .findById(id)
    .then(friend => {
      if (!friend) {
        res.status(404);
        res.send({
          message: 'The friend with the specified ID does not exist.'
        });
      } else {
        res.status(201);
        res.send({ Success: 'Found your Friend!', friend });
      }
    })
    .catch(failed => {
      res.status(500);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

server.delete('/api/friends/:id', (req, res) => {
  let { id } = req.params;

  if (!id) {
    res.status(422);
    res.send(`Need a target to obliderate, please provide an 'ID'.`);
  }

  friends
    .findByIdAndRemove(id)
    .then(friend => {
      if (!friend) {
        res.status(404);
        res.send({
          message: 'The friend with the specified ID does not exist.'
        });
      } else {
        res.status(201);
        res.send({ Success: 'Your friend has been obliterated!', RIPfriend });
      }
    })
    .catch(failed => {
      res.status(500);
      res.send({ error: 'The information could not be retrieved.' });
    });
});

server.put('/api/friends/:id', (req, res) => {
  let { id } = req.params;
  let { body } = req;

  if (!id) {
    res.status(404);
    res.send({ message: 'The friend with the specified ID does not exist.' });
  }
  if (
    !body.hasOwnProperty('firstName') ||
    !body.hasOwnProperty('lastName') ||
    !body.hasOwnProperty('age')
  ) {
    res.status(400);
    res.send({
      errorMessage: 'Please provide firstName, lastName and age for the friend.'
    });
  }
  if (body.age < 1 || body.age > 120) {
    res.status(400);
    res.send({ errorMessage: 'Age must be a whole number between 1 and 120' });
  } else {
    friends
      .findByIdAndUpdate(id, body)
      .then(updated => {
        res.status(200);
        res.send(friends.findById(id));
      })
      .catch(fail => {
        res.status(500);
        res.send({ error: 'The friend information could not be modified.' });
      });
  }
});

const PORT = 2049;
server.listen(PORT, () => {
  console.log(`API Running on Port: ${PORT}`);
});
mongoose
  .connect('mongodb://localhost/friends')
  .then(pass => {
    console.log(`Connected to Mongo, code on playa...`);
  })
  .catch(fail => {
    console.log(`<!> Somethings up, couldn't connect to Mongo <!>`);
  });
