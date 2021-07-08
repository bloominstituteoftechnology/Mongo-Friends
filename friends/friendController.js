const router = require('express').Router();

const Friend = require('./friendModel');


router
    .route('/')
    .get((req, res) => {
        Friend.find()
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => res.status(500).json({ error: 'The friends information could not be retrieved.' }));
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        if ( !firstName || !lastName || !age ) {
            res.status(400).json({ error: 'Please provide first name, last name and age.' });
            return;
        }else if  (isNaN(age) || age < 1 || age > 120){
                res.status(400).json({ error: 'Age is not a number or Age is to low or to high.' });
                return;
            }
        newFriend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                res.status(500).json({ error: 'There was an error while saving the friend to the database.' });
        });
    });

    router
        .route('/:id')
        .get((req, res) => {
           const { id } = req.params;
           Friend.findById(id)
           .then(foundFriend => {
            if(foundFriend === null){
                res.status(404).json({ error: 'The friend with the specified ID does not exist.'});
                return;
            }
            res.json({ success: 'Friend found.',  resource: foundFriend});
          })
           .catch(err => 
            res.status(500).json({ error: 'The friend information could not be retrieved.' }));
           })
        .delete((req, res) => {
            const { id } = req.params;
            Friend.findByIdAndRemove(id)
            .then(deletedFriend => {
                if(deletedFriend === null){
                    res.status(404).json({ error: 'The friend with the specified ID does not exist.'});
                    return;
                }
                res.json({ success: 'Friend deleted.',  resource: deletedFriend});
            })
            .catch(err => 
                res.status(500).json({ error: 'The friend could not be removed.'}));
        })
        .put((req, res) => {
            const { id } = req.params;
            //const { lastName, firstName, age } = req.body;
            //Friend.findByIdAndUpdate(id, {$set:{ lastName, firstName, age }})
            const updates = ({ lastName, firstName, age } = req.body);
            if ( !firstName || !lastName || !age ) {
                res.status(400).json({ error: 'Please provide first name, last name and age.' });
                return;
            }else if  (isNaN(age) || age < 1 || age > 120){
                    res.status(400).json({ error: 'Age is not a number or Age is to low or to high.' });
                    return;
                }
            Friend.findByIdAndUpdate(id, updates, { new: true })
            .then(updatedFriend => {
                if(updatedFriend === null){
                    res.status(404).json({ error: 'The friend with the specified ID does not exist.'});
                    return;
                }
                res.status(201).json({ sucess: 'Updated friend.', resource: updatedFriend});
            })
            .catch(err => 
                res.status(500).json({ error: 'The friend information could not be modified.' }));
        });



    module.exports = router;