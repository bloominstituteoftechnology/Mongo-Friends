const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

mongoose
  .connect("mongodb://localhost/users")
  .then(conn => {
    console.log("connected to mongo");
  })
  .catch(err => {
    console.log("error connecting to mongo");
  });

const port = process.env.PORT || 3030;
server.listen(port, () => console.log(`running on port ${port}`));
