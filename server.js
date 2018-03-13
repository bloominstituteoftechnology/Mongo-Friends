const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const friendRouter = require('./Friends/friendRouter')
// const Friend = require("./Friends/models.js");
const server = express();


server.use(helmet());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).json({ status: "API RUNNING" });
});

server.use('/Friends', friendRouter);

mongoose
  .connect("mongodb://localhost/")
  .then(conn => {
    console.log("connected to mongo");
  })
  .catch(err => {
    console.log("error connect to mongo");
  });
// start server with "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"



const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
