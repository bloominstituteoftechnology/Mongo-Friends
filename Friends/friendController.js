const router = require('express').Router();
const friendModel = require('./friendModel.js');

const errorHandle = (
    result,
    error, 
    operation = "CRUD", 
    routeString = "", 
    errorMessage = "Server could not process request.",
    statusCode = 500
  ) => {
  console.log(`${routeString} ${operation} ERROR:`,error);
  result.status(statusCode).json({errorMessage});
}
router
  .route('/')
  .get((req, res) => {
    //==>
    friendModel.find()
      .then(friends => {
        res.json(friends);
      })
      .catch(err => errorHandle(res, err, "GET", '/api/friends', "The friends information could not be retrieved."));
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
      return;
    }
    if (age < 1 || age > 120) {
      res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
      return;
    }
    //==>
    friendModel.create({ firstName, lastName, age })
      .then(friend =>{
        res.status(201).json(friend);
      })
      .catch(err => errorHandle(res, err, "POST", '/api/friends', "There was an error while saving the friend to the database."));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    friendModel.findById(id)
      .then(friend =>{
        if (friend === null) {
          res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
          return;
        }
        res.json(friend);
      })
      .catch(err => errorHandle(res, err, "GET", `/api/friends/${id}`, "The friend information could not be retrieved."));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    friendModel.findByIdAndRemove(id)
      .then(exfriend => {
        if (exfriend === null) {
          res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
          return;
        }
        res.json(exfriend);
      })
      .catch(err => errorHandle(res, err, "DELETE", `/api/friends/${id}`, "The friend could not be removed"));
  })
  .put((req, res) => {
    const { id } = req.params;
    const editObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age
    };
    //==>
    friendModel.findById(id)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
        }
        for (let key in editObj) {
          if (editObj[key] !== undefined) {
            friend[key] = editObj[key];
          }
        }
        friend.save()
          .then(friend =>{
            res.status(201).json(friend);
          })
          .catch(err => errorHandle(res, err, "PUT", `/api/friends/${id}`, "The friend information could not be modified."));
      })
      .catch(err => {
        console.log(`/api/friends/${id} PUT error:`, err);
        if (err.path === 'age' && err.name === 'ValidatorError') {
          res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
          return;
        }
        res.status(500).json({ errorMessage: "The friend information could not be modified." })
      });


  })

  module.exports = router;
