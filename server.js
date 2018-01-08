const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const User = require('./UserModel.js');
const BlogPost = require('./BlogPostModel.js');
const server = express();
server.use(bodyParser.json());
server.use(cors())


server.post('/users', (req, res) => {
  const userInfo = req.body;

  if(!userInfo.userName) {
    res.status(400).json({error: "Please provide a username"})
  } else {
    const user = new User(userInfo);

    user.save()
      .then((newUser) => {
        res.status(200).json(newUser);
      })
      .catch(() => {
        res.status(500).json({ error: "Some crazy shit went down!"})
      })
  }
})

server.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.status(200).json(users);
  }). catch(() => {
    res.status(500).json({ error: "Could not get the users"})
  })
})

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: "Invalid ID"})
    });
})

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      User.remove(user,(cd) => {
        res.status(200).json(user);
      })
    })
    .catch((error) => {
      res.status(500).json({ error: "Invalid ID"})
    })
})

///////////Bolg posts

server.post('/posts', (req, res) => {
  const postInfo = req.body;

  if(!postInfo.blogpost) {
    res.status(400).json({error: "Can't post nothing!"})
  } else {
    const post = new BlogPost(postInfo);

    post.save()
      .then((newPost) => {
        res.status(200).json(newPost);
      })
      .catch(() => {
        res.status(500).json({ error: "Some crazy shit went down!"})
      })
  }
})

server.get('/posts', (req, res) => {
  BlogPost.find({}).then((posts) => {
    res.status(200).json(posts.map((post) => {
      return [post.blogpost, post._id]
    }));
  }). catch(() => {
    res.status(500).json({ error: "No post up in the Hizzy"})
  })
})

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  BlogPost.findById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: "Invalid ID"})
    });
})

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  BlogPost.findById(id)
    .then((post) => {
      BlogPost.remove(post,(cd) => {
        res.status(200).json(post);
      })
    })
    .catch((error) => {
      res.status(500).json({ error: "Invalid ID"})
    })
})



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bears', { useMongoClient: true })
  .then(() => {
    server.listen(3000, () => {
      console.log('bang zoom zoom straight to the moon alice')
    });
  })
  .catch((error) => {
    console.log("Database is not basing data!")
  })