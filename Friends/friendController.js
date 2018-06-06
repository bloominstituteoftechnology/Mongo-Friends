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
    // const { firstName, lastName, age } = req.body;
    // if (!firstName || !lastName || !age) {
    //   res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
    //   return;
    // }
    // if (age < 1 || age > 120) {
    //   res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
    //   return;
    // }
    //==>
    friendModel.create(req.body)
      .then(friend =>{
        res.status(201).json(friend);
      })
      .catch(err => {
        // errorHandle(res, err, "POST", '/api/friends', "There was an error while saving the friend to the database.");
        res.status(500).json({ error: err });
      });
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
    // Previously had code to check for undefined's and filter them out, so only
    // fields intended to be updated will be updated. After Ryan's lecture today,
    // I found out that was completely unecessary. Mongoose handles that stuff OK.
    // i.e. if a field is undefined, mongoose leaves it alone. Thanks, mongoose.
    //==>
    const { id } = req.params;
    const nestedUpdate = (friend, request) => {
      for (let key in request) {
        console.log("REQUEST[KEY]:",request[key]);
        if (typeof request[key] === "object") {
          nestedUpdate(friend[key], request[key]);
        } else {
          friend[key] = request[key];
        }
      }
    };
    //==>
    friendModel.findById(id)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
          return;
        }
        nestedUpdate(friend, req.body);
        console.log("Friend:\n",friend,"\nRequest:\n",req.body);
        friend.save()
          .then(updFriend =>{
            res.status(201).json(updFriend);
          })
          .catch(err => res.status(500).json({ errorMessage: err.message }));
      })
      .catch(err => {
        console.log(`/api/friends/${id} PUT error:`, err);
        if (err.path === 'age' && err.name === 'ValidatorError') {
          res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
          return;
        }
        res.status(500).json({ errorMessage: err.message })
      });


  })

  module.exports = router;
