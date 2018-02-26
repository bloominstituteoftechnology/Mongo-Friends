const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const Friend = require("./Friend/FriendModel");
const BlogPosts = require("./BlogPosts/BlogPosts.js");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Friends
app.get("/api/friends", (req, res) => {
  getAllItems(Friend, req, res);
});

app.get("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  getItemById(Friend, id, req, res);
});

app.post("/api/friends", (req, res) => {
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName || !age) {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName and age for the friend."
    });
  } else if (Number(age) > 120 || Number(age) < 1) {
    res
      .status(400)
      .json({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(newFriend => {
        res.status(201).json(newFriend);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the friend to the database"
        });
      });
  }
});

app.put("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  if (!id) {
    res.status(400).json({ error: "You must include an id in the put url." });
  } else if (!firstName || !lastName || !age) {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName and age for the friend."
    });
  } else if (Number(age) > 120 || Number(age) < 1) {
    res
      .status(400)
      .json({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    Friend.findByIdAndUpdate(id, req.body, { new: true })
      .then(updatedFriend => {
        res.status(200).json(updatedFriend);
      })
      .catch(err => {
        if (err.name === "CastError") {
          res.status(404).send({
            message: "The friend with the specified ID does not exist."
          });
        } else {
          res
            .status(500)
            .json({ error: "The friend information could not be modified." });
        }
      });
  }
});

app.delete("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  deleteItem(Friend, id, req, res);
});

//BlogPosts

app.get("/api/posts", (req, res) => {
  getAllItems(BlogPosts, req, res);
});

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  getItemById(BlogPosts, id, req, res);
});

app.post("/api/posts", (req, res) => {
  const { author, title, body } = req.body;

  const newPost = new BlogPosts(req.body);

  newPost
    // .populate("friend")
    .save()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, body, author } = req.body;

  if (!id) {
    res.status(400).json({ err: "Please provide an id" });
  } else if (!title || !body || !author) {
    res.status(400).json({ err: "You need a Title,, Body, and an Author" });
  } else {
    BlogPosts.findByIdAndUpdate(id, req.body, { new: true })
      .then(updatedPost => {
        res.status(200).json(updatedPost);
      })
      .catch(err => {
        if (err.name === "CastError") {
          res.status(404).send({
            message: "The post with the specified ID does not exist."
          });
        } else {
          res
            .status(500)
            .json({ error: "The friend information could not be modified." });
        }
      });
  }
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  deleteItem(BlogPosts, id, req, res);
});

//Functions

const getAllItems = (collection, req, res) => {
  collection
    .find({})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const getItemById = (collection, getId, req, res) => {
  collection
    .findById(getId)
    .then(result => {
      if (!result) {
        res.status(404).json({
          error: `The ${collection.name} with ${getId} does not exsist`
        });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error with the server yo" });
    });
};

const deleteItem = (collection, getId, req, res) => {
  collection
    .findByIdAndRemove(getId)
    .then(result => {
      if (result === null) {
        res.status(404).json({
          message: `The ${
            collection.name
          } with the specified ID: ${getId} does not exist.`
        });
      } else {
        res.status(200).json({ result });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The ${collection.name} could not be removed` });
    });
};

mongoose
  .connect("mongodb://localhost/friends")
  .then(db => {
    console.log(
      `Successfully connected to the ${db.connections[0].name} database`
    );
  })
  .catch(err => {
    console.error("Error connecting to the database");
  });

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
