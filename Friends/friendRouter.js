const express = require('express');

const Friend = require('./models.js');
const friendRouter = express.Router();



friendRouter.post("/api/friends", (req, res) => {
});

friendRouter.get("/api/friends", (req, res) => {
  
});

friendRouter.get("/api/friends/:id", (req, res) => {

});

friendRouter.delete("/api/friends/:id", (req, res) => {

});

friendRouter.put('/api/friends/:id', (req, res) => {

})


module.exports = friendRouter;
