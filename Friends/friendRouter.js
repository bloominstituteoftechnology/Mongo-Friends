const express = require('express');
const friendRouter = express.Router();

const Friend = require("./models.js");



friendRouter.post("/api/friends", (req, res) => {
});

friendRouter.get("/api/friends", (req, res) => {
  res.json('hey')
});

friendRouter.get("/api/friends/:id", (req, res) => {

});

friendRouter.delete("/api/friends/:id", (req, res) => {

});

friendRouter.put('/api/friends/:id', (req, res) => {

})


module.exports = friendRouter;
