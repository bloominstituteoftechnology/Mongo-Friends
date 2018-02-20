const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Friend = require('./Friends/FriendModel.js');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

const validate = (friendInfo, res) => {
  if (!isValid(friendInfo)) {
    res.status(400).json({
      errorMessage:
        'Please provide firstName, lastName and age for the friend.',
    });
    return false;
  }

  if (!isOf(+friendInfo.age)) {
    res.status(400).json({
      errorMessage: 'Age must be a whole number between 1 and 120',
    });
    return false;
  }

  return true;
};

const isValid = friendInfo => {
  return friendInfo.firstName && friendInfo.lastName && friendInfo.age;
};

const isOf = age => {
  return Number.isInteger(age) && age >= 1 && age <= 120;
};

server.post('/api/friends', (req, res) => {
  const { firstName, lastName } = req.body;
  const age = +req.body.age;
  const friendInformation = { firstName, lastName, age };

  if (!validate({ ...friendInformation, age: req.body.age }, res)) {
    return;
  }

  const friend = new Friend(friendInformation);

  friend
    .save()
    .then(savedFriend => res.status(201).json(savedFriend))
    .catch(err =>
      res.status(500).json({
        error: 'There was an error while saving the friend to the database',
      }),
    );
});

server.get('/api/friends', (req, res) => {
  Friend.find()
    .then(friends => res.status(200).json(friends))
    .catch(err =>
      res.status(500).json({
        error: 'The information could not be retrieved.',
      }),
    );
});

server.get('/api/friends/:id', (req, res) => {
  const { id } = req.params;

  Friend.findById(id)
    .then(friend => {
      if (friend === null) {
        res.status(500).json({
          error: 'The information could not be retrieved.',
        });
        return;
      }

      res.status(200).send(friend);
      return;
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
        return;
      }
    });
});

server.delete('/api/friends/:id', (req, res) => {
  const { id } = req.params;

  Friend.findByIdAndRemove(id)
    .then(deletedFriend => {
      if (deletedFriend === null) {
        res.status(500).json({
          error: 'The friend could not be removed',
        });
        return;
      }

      res.status(200).send(deletedFriend);
      return;
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
        return;
      }
    });
});

server.put('/api/friends/:id', (req, res) => {
  const { id } = req.params;

  const { firstName, lastName } = req.body;
  const age = +req.body.age;
  const friendInformation = { firstName, lastName, age };

  if (!validate({ ...friendInformation, age: req.body.age }, res)) {
    return;
  }

  Friend.findById(id)
    .then(friend => {
      Friend.findByIdAndUpdate(friend._id, friendInformation, { new: true })
        .then(friendInformation => {
          res.status(200).send(friendInformation);
          return;
        })
        .catch(err => {
          res.status(500).send({
            error: 'The friend information could not be modified.',
          });
          return;
        });
    })
    .catch(err => {
      res.status(404).json({
        message: 'The friend with the specified ID does not exist.',
      });
    });
});

mongoose
  .connect('mongodb://localhost/FriendKeeper')
  .then(db => {
    console.log(
      `Successfully connected to -- ${db.connections[0].name} -- database`,
    );
  })
  .catch(err => {
    console.error('Database connection failed.');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
