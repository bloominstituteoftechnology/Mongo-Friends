const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const Friend = require('./Friends/FriendModel');
const BlogPost = require('./BlogPosts/BlogPostModel');

const server = express();
const PORT = process.env.PORT || 5050;

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ status: `API running on port ${PORT}`});
});

const genericGet = (collection, req, res) => {
  collection.find()
    .then(results => {
      res
        .status(200)
        .json(results);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
  return;
};

const genericGetById = (collection, req, res, item) => {
  const id = req.params.id;
  collection.findById(id)
    .then(result => {
      if (result) {
        res
          .status(200)
          .json(result);
      } else {
        res
          .status(404)
          .json({ message: `The ${item} with the specified ID does not exist.` });
      }
    })
    .catch(error => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .json({ message: `The ID: ${error.value} is not valid.` });
      }
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
};

const genericDelete = (collection, req, res, item) => {
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
          .json({ message: `The ${item} with the specified ID does not exist.` });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `The ${item} could not be removed` });
    });
};

server.post('/api/friends', (req, res) => {
  const friendInformation = req.body;
  const { firstName, lastName, age } = friendInformation;

  const friend = new Friend(friendInformation);
  if ( firstName && lastName && age ) {
    if (typeof age !== 'number' || age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a whole number between 1 and 120' });
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
            .json({ errorMessage: 'There was an error while saving the friend to the database' });
        });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  }
});

server.get('/api/friends', (req, res) => {
  genericGet(Friend, req, res);
});

server.get('/api/friends/:id', (req, res) => {
  genericGetById(Friend, req, res, 'friend');
});

server.delete('/api/friends/:id', (req, res) => {
  genericDelete(Friend, req, res, 'friend');
});

server.put('/api/friends', (req, res) => {
  const friendInformation = req.body;
  const { id, firstName, lastName, age } = friendInformation;

  if ( id && firstName && lastName && age ) {
    if (typeof age !== 'number' || age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a whole number between 1 and 120' });
    } else {
      const updatedFriend = req.body;
      Friend.findByIdAndUpdate(id, updatedFriend, { new: true })
        .then(friend => {
          res
            .status(200)
            .json(friend);
        })
        .catch(error => {
          res
            .status(500)
            .json({ errorMessage: 'There was an error while saving the friend to the database' });
        });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  }
});

server.post('/api/posts', (req, res) => {
  const postInformation = req.body;
  const { author, title, body } = postInformation;

  const blogPost = new BlogPost(postInformation);
  if ( author && title && body ) {
    blogPost
    .save()
    .then(savedPost => {
      res
      .status(201)
      .json(savedPost);
    })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide authorID, title and body for the post." });
  }
});

server.get('/api/posts', (req, res) => {
  genericGet(BlogPost, req, res);
});

server.get('/api/posts/:id', (req, res) => {
  genericGetById(BlogPost, req, res, 'post');
});

server.delete('/api/posts/:id', (req, res) => {
  genericDelete(BlogPost, req, res, 'post');
});

server.put('/api/posts', (req, res) => {
  const postInformation = req.body;
  const { id, title, body } = postInformation;

  if ( id && title && body ) {
    const updatedPost = req.body;
    BlogPost.findByIdAndUpdate(id, updatedPost, { new: true })
      .then(post => {
        res
          .status(200)
          .json(post);
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: 'There was an error while saving the post to the database' });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide id, title, and body for the post." });
  }
});

mongoose
  .connect('mongodb://localhost/FriendFinder')
  .then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database.`)
  })
  .catch(error => {
    console.log('Database connection failed');
  });

server.listen(PORT, () => {
  console.log(`API runing on http://localhost:${PORT}`);
})