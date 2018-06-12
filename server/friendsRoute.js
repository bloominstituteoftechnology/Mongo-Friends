const express = require("express");
const router = express.Router();
const db = require("./models");

router.get("/", (req, res) => {
  db
    .find()
    .then(p => {
      if (p === null) {
        return res.status(404).json({ msg: "there is no friends found " });
      }
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not able to fetch your friends" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(p => {
      if (p === null) {
        return res.status(404).json({ msg: "friend not found" });
      }
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not able to fetch your friends" });
    });
});

router.post("/", (req, res) => {
  const obj = req.body;

  newDB = new db(obj);
  newDB
    .save()
    .then(p => {
      res.status(201).json(p);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: "we are not able to add  your friend ", err });
    });
});

router.put("/:id", (req, res) => {
  const obj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age
  };

  const { id } = req.params;

  db
    // .findById(id)
    .update(id, obj)
    .then(p => {
      if (p === null) {
        return res.status(404).json({ msg: "friend not found" });
      }
      res.status(200).json(" a friend is updated ");
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not able to update  your friend " });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    // .findById(id)
    .remove(id)
    .then(p => {
      if (p === null) {
        return res.status(404).json({ msg: "friend not found" });
      }
      res.status(200).json(" a friend is deleted ");
    })
    .catch(err => {
      res.status(500).json({ msg: "we are not delete to add  your deleted " });
    });
});

module.exports = router;
