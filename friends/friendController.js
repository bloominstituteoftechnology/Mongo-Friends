const router = require('express').Router();

const Friends = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friends.find()
            .then(friends => {
                res.json(friends);
            })
            .catch(error => {
                res.status(500).json({error: 'The friends information could not be retrieved.'})
            })
    })
    .post((req, res) => { 
        const { firstName, lastName, age, createdOn, contactInfo} = req.body;
        const newFriend = new Friends ({firstName, lastName, age, createdOn, contactInfo });
        if (!firstName || !lastName || !age) {
            res.status(400).json({error: 'Please provide firstName, lastName and age for the friend.'})
            return;
        }
        if(isNaN(age) || age < 1 || age > 120) {
            res.status(400).json({error: 'Age must be a number between 1 and 120'})
            return;
        }
        newFriend.save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(error => {
                res.status(500).json({error: 'There was an error while saving the friend to the database.'})
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;

        if (id.length < 24) { // all IDs in mongo contain 24 characters
            res.status(400).json({error: 'The database requires an ID with 24 characters.'})
        }

        Friends.findById(id) 
            .then(foundFriend => {
                if(foundFriend) {
                    console.log(foundFriend)
                    res.json(foundFriend);
                    return;
                } else {
                    res.status(404).json({error: `Friend with id ${id} does not exist`, resource: foundFriend}) // resource === null
                    return;
                }
            })
            .catch(error => {
                res.status(500).json({error: 'The friend information could not be retrieved.'})  
            })
    })

    .delete((req, res) => {
        const { id } = req.params;

        if (id.length < 24) { 
            res.status(400).json({error: 'The database requires an ID with 24 characters.'})
            return;
        }

        Friends.findByIdAndRemove(id)
            .then(response => {
                if(response) {
                    console.log(response)
                    res.json({success: 'The friend with the specified ID was removed.'})
                    return;
                } else {
                    res.status(404).json({error: 'The friend with the specified ID does not exist.', resource: response})
                    return;
                }
            })
            .catch(error => {
                res.status(500).json({error: 'The friend could not be removed.'})
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        const updatedFriend = ({ firstName, lastName, age, contactInfo} = req.body); // this syntax allows you to update any given item in the body without sending/updating the others 
        // const updatedFriend = { firstName, lastName, age } // this syntax will update whichever field you update, but if the rest are omitted, it returns null for those

        if (id.length < 24) { 
            res.status(400).json({error: 'The database requires an ID with 24 characters.'})
        }

        if(age < 1 || age > 120) {
            res.status(400).json({error: 'Age must be a number between 1 and 120'})
            return;
        }

        Friends.findByIdAndUpdate(id, updatedFriend, {new: true}) //new: true will give you the updated resource, not the previous one
        .then(response => {
            if(response) {
                res.json({success: 'The friend has been updated successfully', resource: response})
                return;
            } else {
                res.status(400).json({error: 'The friend with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({error: 'The friend information could not be modified.' })
        })
    })

    module.exports = router;