//Modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose")
const Friend = require("./friends/friendsModel");


//Database
mongoose.connect("mongodb://localhost/").then(mongo => {
   console.log("Connected to database")
}).catch(err => {
  console.log("error connecting to database", err)
})


//Middleware
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());




//Route handlers
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get("/api/friends", (req, res) => {
  Friend.find().then(friends => {
    res.status(200).json(friends)
  }).catch(err => {
    res.status(500).json({
      errorMessage: "The friends information could not be retrieved."     })
  })
})

server.get("/api/friends/:id", (req, res) => {
  const id = req.params.id
  Friend.findById(id).then(friend => {
    res.status(200).json(friend)
  }).catch(err => {
    res.status(404).json({
      message: "A friend with that id could not be found"
    })
  })
})

server.post("/api/friends", (req, res) => {
  const friendData = req.body;
  const friend = new Friend(friendData);

  if(friendData.firstName.length === 0 || 
    friendData.lastName.length === 0 ||
    friendData.age.length === 0) {
      return res.status(500).json({
        errorMessage: "Please provide firstName, lastName and age for the friend."       })
    }
  else if(typeof friendData.age != 'number' || friendData.age < 1) {
    return res.status(500).json({
      errorMessage: "Age must be a number between 1 and 120"
    })
  } else {
    friend.save().then(friend => {
      res.status(201).json({
        message: "Successfuly saved new friend to database"
      })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "There was an error while saving the friend to the database."
      })
    })
  }
})


server.delete("/api/friends/:id", (req, res) => {
  const id = req.params.id
  
  Friend.findById(id).then(friend => {
    if(friend == null) {
      res.status(404).json({
        errorMessage: "The friend with the specified id could not be found!"
      })
    }
    else {
      Friend.findOneAndRemove(id).then(friend => {
        res.status(200).json({
            message: "Friend has been deleted from the database"
          })
      })
    }
      
  }).catch(err => {
    res.status(500).json({
      errorMessage: "The friend could not be removed"
    })
  })
})
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
