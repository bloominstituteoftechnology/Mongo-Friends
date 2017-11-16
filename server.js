const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const STATUS_USER_ERROR = 422;
const STATUS_BLOG_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const User = require("./UserModel.js");
const Blog = require("./BlogModel.js")

const server = express();

server.use(bodyParser.json());
server.use(cors());

let firstName, lastName, email;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/users", { useMongoClient: true })
  .then(function(db) {
    console.log("All your dbs belong to us!");
    server.listen(3001, function() {
      console.log("server running on port 3001");
    });
  })
  .catch(function(err) {
    console.log("DB connection failed..", err.message);
  });

// ----------------------------USER----------------------------

server.post("/users", function(req, res) {
  const newUser = new User(req.body);

  // do checks here to make sure the user has all the data
  if (
    newUser.firstName === "" ||
    newUser.lastName === "" ||
    newUser.email === ""
  ) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "Could not create user due to missing fields" });
    return;
  } else {
    newUser.save(function(err, user) {
      if (err) {
        res
          .status(STATUS_SERVER_ERROR)
          .json({ error: "Could not create the user." });
      } else {
        res.status(201).json(user);
      }
    });
  }
});

server.get("/users", function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res
        .status(STATUS_SERVER_ERROR)
        .json({ error: "Could not retrieve users" });
    } else {
      res.status(200).json(users);
    }
  });
});

server.get("/users/:id", function(req, res) {
  const { id } = req.params;
  User.findById(id, function(err, users) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({ error: "Could not retrieve user" });
    } else {
      res.status(200).json(users);
    }
  });
});

//delete user
server.delete("/users/:id", function(req, res) {
  const { id } = req.params;
  User.findByIdAndRemove(id, function(err, users) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({ error: "Could not delete user" });
    } else {
      res.status(200).json({ success: "User deleted!"});
    }
  });
});

// ----------------------------USER----------------------------



// ----------------------------BLOG----------------------------

server.post("/blogs", function(req, res) {
    const newBlog = new Blog(req.body);
  
    // do checks here to make sure the blog has all the data
    if (
      newBlog.userId === "" ||
      newBlog.blogPost === ""
    ) {
      res
        .status(STATUS_BLOG_ERROR)
        .json({ error: "Could not create blog due to missing fields" });
      return;
    } else {
      newBlog.save(function(err, blog) {
        if (err) {
          res
            .status(STATUS_SERVER_ERROR)
            .json({ error: "Could not create the blog." });
        } else {
          res.status(201).json(blog);
        }
      });
    }
  });
  
  server.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
      if (err) {
        res
          .status(STATUS_SERVER_ERROR)
          .json({ error: "Could not retrieve blogs" });
      } else {
        res.status(200).json(blogs);
      }
    });
  });
  
  server.get("/blogs/:blogId", function(req, res) {
    const { blogId } = req.params;
    Blog.findById(blogId, function(err, blogs) {
      if (err) {
        res.status(STATUS_BLOG_ERROR).json({ error: "Could not retrieve blog" });
      } else {
        res.status(200).json(blogs);
      }
    });
  });
  
  server.delete("/blogs/:blogId", function(req, res) {
    const { blogId } = req.params;
    Blog.findByIdAndRemove(blogId, function(err, blogs) {
      if (err) {
        res.status(STATUS_BLOG_ERROR).json({ error: "Could not delete blog" });
      } else {
        res.status(200).json({ success: "Blog deleted!"});
      }
    });
  });

  // ----------------------------BLOG----------------------------

