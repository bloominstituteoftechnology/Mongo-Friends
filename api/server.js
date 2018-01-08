const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require(`./Users/UserModel.js`);
const Post = require(`./Posts/PostModel.js`);

const server = express();

server.use(bodyParser.json());

/* 
*
*  endpoints
*
*/

// a string being returned to the '/' endpoint because we are not using it
server.get("/", (req, res) => {
  res.status(200).json("Nothing to see here folks, move along...");
});

/*
 users CRUD endpoints
*/

// This route should save a new user to the server.
server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  if (!userInformation.firstName || !userInformation.lastName) {
    res.status(400).json({
      errorMessage: "Pleaee provide both first name and last name for the user"
    });
  } else {
    const user = new User(userInformation);
    user
      .save()
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json({
          error: "there was an error while saving user to the database"
        });
      });
  }
});

// This route will return an array of all users.
server.get("/api/users", (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

// This route will return the user with the matching `id` (`_id` on the db document) property.
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

// This route should delete the specified user.
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).json({ Deleted: user.id });
    })
    .catch(error => {
      res.status(500).json({
        error: "the user could not be deleted"
      });
    });
});

/*
 posts CRUD endpoints
 */

// This route should save a new blog post to the server.
server.post("/api/posts", (req, res) => {
  const postinformation = req.body;
  if (!postinformation.body) {
    res.status(400).json({
      errorMessage: "Pleaee provide the body of the post"
    });
  } else {
    const post = new Post(postinformation);
    post
      .save()
      .then(newPost => {
        res.status(200).json(newPost);
      })
      .catch(error => {
        res.status(500).json({
          error: "there was an error while saving post to the database"
        });
      });
  }
});

// This route will return an array of all blog posts.
server.get("/api/posts", (req, res) => {
  Post.find({})
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

// This route will return the blog post with the matching `id` property.
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

// This route should delete the specified blog post.
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  Post.findByIdAndRemove(id)
    .then(post => {
      res.status(200).json({ Deleted: post.id });
    })
    .catch(error => {
      res.status(500).json({
        error: "the post could not be deleted"
      });
    });
});

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/LS-Mongo-I", { useMongoClient: true })
  .then(() => {
    server.listen(5000, () => {
      console.log("Database connected and server fired up on port 5000");
    });
  })
  .catch(error => {
    console.log("database connection failed");
  });
