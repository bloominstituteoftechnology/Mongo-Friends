const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./PostModel/PostModel");

const server = express();
const port = 5000;
server.use(bodyParser.json());
server.use(cors());

server.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ errorMessage: "Please provide both title and content for the Post" });
    return;
  }
  const post = new Post({ title, content });
  post.save()
    .then(() => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the Post to the Database" });
    });
});

server.get('/posts', (req, res) => {
  Post.find({})
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({ successful: `Delete the post by ID: ${id}` });
    })
    .catch(error => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/posts", { useMongoClient: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Please start the mongoDB');
  });