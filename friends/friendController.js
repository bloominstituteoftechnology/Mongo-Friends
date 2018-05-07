const router = require("express").Router();

const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
      Friend.find({})
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(error => {
            res.status(500).json({
                error: "Friends info could not be retrieved."
            })
        })    
  })
  
//   .post((req, res) => {
//     res.status(201).json(friend);
//   })
//   .catch(error => {
//     res.status(500).json(error);
//   });
