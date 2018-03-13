const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const Friend = require("./Friends/models.js");
const friendRouter = require('./Friends/friendRouter')
server.use('/Friends', friendRouter);


const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).json({ status: "API RUNNING" });
});

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
