const express = require("express");
const helmet = require("helmet");
const cors = require("cors"); // https://www.npmjs.com/package/cors
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const FriendRouter = require("./FriendRouter.js");
const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/friends")
    .then(conn => {
      console.log("Successfully Connected to Friends database!")
    })
    .catch(err => {
      console.log("Database connection failed. . .")
    });

server.get("/", function(req, res) {
  res.status(200).json({ status: "API Running" });
});

server.use("/api/friends", FriendRouter);

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});