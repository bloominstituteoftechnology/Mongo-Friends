//import Router
const router = require("express").Router();
const Friend = require("./friendModel");

const sendUserError = (status, message, res, err="Not From Catch") => {
    res.status(status).json({Error: message, err});
    return;
  }

//get friends

const get = (req, res) =>{
    
    Friend
        .find()
        .then(friends =>{
            res.status(200).json(friends)
        })
        .catch(err =>{
            sendUserError(500, "There was an error in retrieving friends' information", res, err);
        });
}

const post = (req, res) =>{
    const { firstName, lastName, age } = req.body;

    if(!firstName || !lastName || !age){
        sendUserError(400, `Please provide firstName, lastName and age for the friend.`, res);
    }
    if((age < 1 || age > 120) && age.typeof !==Number){
        sendUserError(400, "Age must be a number between 1 and 120", res)
    }
    const friend = new Friend({firstName, lastName, age});
    friend
    .save()
    .then(friend =>{
        res.status(201).json(friend)
    })
    .catch(err =>{
        sendUserError(500, "There was an error in saving friend data", res, err)
    })
}

const getId = (req, res) =>{
    const { id } = req.params;
    Friend
    .findById(id)
    .then(friend =>{
        res.status(200).json(friend)
    })
    .catch(err =>{
        sendUserError(500, `There was an error in retrieving ${id}`, res, err)
    });
}

const deleteId = (req, res) =>{
    const { id } = req.params;
    if(!id ===null){
        sendUserError(400, "There is no ID to delete", res)
    }
    Friend
        .remove({ _id: id } )
        .then(result =>{
            res.status(204).json(result)
        })
        .catch(err =>{
            sendUserError(500, `There was an error in the deletion of ${id}`, res, err)
        });
}

const updateId = (req, res) =>{
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    if(!id){
        sendUserError(400, `There was an error in retrieving ${id}`, res, err)
    }
      // Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);
    Friend.update({ _id: id }, { $set: { firstName, lastName, age }})
        .then(friend =>{
            res.status(200).json(friend)
        })
        .catch(err =>{
            res.status(500, `There was an error in updating ID: ${id}.`, res, err)
        });
}


router
  .route('/')
  .get(get) //these are all callbacks from above
  .post(post)

router
  .route('/:id')
  .get(getId)
  .delete(deleteId)
  .put(updateId);

module.exports = router;