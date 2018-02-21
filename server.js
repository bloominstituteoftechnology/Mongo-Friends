const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Friend = require('./Friends/FriendModel');
const Blog = require('./BlogPosts/BlogModel');

const PORT = 3000;
server = express();
server.use(bodyParser.json());


server.post('/api/friends', (req, res) => {
  const FriendInformation = req.body;
  const {firstName, lastName, age} = req.body;

  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  } else if (!Number.isInteger(age) ||  (age < 1 || age > 120)) {
    res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    const friend = new Friend(FriendInformation);
    
    friend.save()
      .then(friendAdded => {
        res.status(201).json(friendAdded);
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the friend to the database" });
      })
  }
});


server.get('/api/friends', (req, res) => {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json({ error: "The information could not be retrieved." });
    })
});

server.get('/api/friends/:id', (req, res) => {
  const id = req.params.id;

  Friend.findById(id)
    .then(friend => {
      if(friend) {
        res.status(200).json(friend)
      } else {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.delete('/api/friends/:id', (req, res) => {
  const id = req.params.id;

  Friend.findByIdAndRemove(id)
    .then(deletedFriend => {
      if (deletedFriend) {
        res.status(200).json(deletedFriend);
      } else {
        res.status(404).json({ message: "The friend with the specified ID does not exist." });
      }
    }) 
    .catch(err => res.status(500).json({ error: "The friend could not be removed" }))
});

server.put('/api/friends/:id', (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, age } = req.body

  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  } else if (!Number.isInteger(age) || (age < 1 || age > 120)) {
    res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    Friend.findByIdAndUpdate(id, req.body)
      .then(updatedFriend => {
        if (updatedFriend) {
          res.status(200).json(updatedFriend);
        } else {
          res.status(404).json({ message: "The friend with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The friend information could not be modified." });
      })
  }
});


// Stretch Problems 

server.post('/api/blogs', (req, res) => {
  const blogInfo = req.body;
  const { author, title, body} = req.body;
  const blog = new Blog(blogInfo);

  if (!author || !title || !body) {
    res.status(400).json({ errorMessage: "Please provide author, title and body for the blog post." });
  } else {
    blog.save()
      .then(blog => {
        res.status(200).json(blog);
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the blog to the database." });
      })
  }
});

server.get('/api/blogs', (req, res) => {
  Blog.find()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(error => {
      res.status(500).json({ error: "The information could not be retrieved." });
    })
});

server.get('/api/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findById(id)
    .then(blog => {
      if(blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: "The blog post with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The information could not be retrieved." });
    })
});

server.delete('/api/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndRemove(id)
    .then(blog => {
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: "The blog post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The blog post could not be removed" })
    })
});

server.put('/api/blogs/:id', (req, res) => {
  const id = req.params.id;
  const {author, title, body} = req.body;

  if (!author || !title || !body) {
    res.status(400).json({ errorMessage: "Please provide author, title and body for the blog post." });
  } else {
    Blog.findByIdAndUpdate(id, req.body)
      .then(updatedBlog => {
        if (updatedBlog) {
          res.status(200).json(updatedBlog);
        } else {
          res.status(404).json({message: "The blog post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The information could not be updated." })
      })
  }
})

mongoose.connect('mongodb://localhost/friends')
  .then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database`)
  })
  .catch(err => {
    console.error('Database Connection Failed')
  })


server.listen(PORT, err => {
  if (err) {
    console.log(`There was a problem starting your server on port: ${PORT}`)
  } else {
    console.log(`Server is running on port: ${PORT}`)
  }
})