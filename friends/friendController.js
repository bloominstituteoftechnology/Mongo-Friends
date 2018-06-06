const router = require('express').Router(); //declares that all routes for this address will be found on this router.
const Friends = require('./friendModel'); // Here we're pulling in our friendModel

// https://www.cheatography.com/kstep/cheat-sheets/http-status-codes/ 

router
    .route('/')
    .get((req, res) => {
        Friends.find() //This will find all the resources at that model.
        .then(friends => {
            res.json(friends);
        })
        .catch(err => {
            res.status(500).json({error: 'The friends information could not be retrieved.'});
        })
    })
    .post((req, res) => {
        const { firstName, lastName, age, createdOn} = req.body;
        const newFriend = new Friends ({ firstName, lastName, age, createdOn});

        if (!firstName || !lastName || !age) {
        res.status(400).json({error: 'Please provide firstName, lastName and age for the friend.'});
        return; 
        } else if (age < 1 || age > 120) {
            res.status(400).json({error: 'Age must be a number between 1 and 120'});
            return;
        } else {
            newFriend
            .save() // this will 'insert' a document into the Friend collection
            .then(friend => {
                console.log(friend);
                res.status(201).json(friend); //201: created 
            })
            .catch(err => {
                res.status(422).json({error: err}); //422: Unproc­essable Entity
            })
        }
    });

    router
        .route('/:id')
            .get((req, res) => {
                const { id } = req.params;
                Friends.findById(id)
                .then(singleFriend => {
                    res.json(singleFriend);
                })
                .catch(err => {
                    if(err.name === "CastError") {
                        res.status(404).json({error: 'The friend with the specified ID doesn\'t exist.'});
                        return;
                    } else {
                        res.status(500).json({error: 'The friend could not be removed'});
                    }
                })
            })
            .delete((req, res) => {
                const { id } = req.params;
                Friends.findByIdAndRemove(id)
                .then(removedFriend => {
                    res.json(removedFriend); 
                })
                .catch(err => {
                    if (err.name === null) {
                          // IF there is no friend by that id, then mongo won't throw an error, rather give us back a null object
                        // MAKE SURE you handle this null object!!!
                        res.status(404).json({error: 'The friend with the specified ID does not exist'});
                        return;
                    } 
                        res.status(500).json({error: 'The friend could not be removed'});
                })
            })
            .put((req, res) => {
                const { id } = req.params;
                const newFriend = { firstName, lastName, age, createdOn } = req.body; //shortand syntax is a best practice to guard against undefined value in keys

               if ((age && (typeof age !== 'number' || age < 1 || age > 120))) {
                res.status(400).json({error: 'Please provide firstName, lastName and age'});
                return;
               } 
               Friends.findByIdAndUpdate(id, newFriend, {new: true}) //new: true, sends us the updated resource not the one we operated on
               .then(friend => {
                   res.status(200).json(friend);
               })
               .catch(err => {
                   if(err.name === null) {
                       res.status(404).json({error: 'The friend with the specified ID does not exist.'});
                       return;
                   } else {
                       res.status(500).json({error: 'The friend information could not be modified.'});
                   }
               })
            })


 

module.exports = router; 

