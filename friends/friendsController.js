const router = require('express').Router();
const Friend = require('./friendsModel');

router
.route('/')
.get((req, res) => {
 Friend.find()
    .then(friends => {
        res.status(200).json(friends)
    })
    .catch(err => res.status({error: 'Error fetching friends'}));
})
.post((req, res) => {
const { firstName, lastName, age } = req.body;
const newFriend = new Friend({ firstName, lastName, age});
if(!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.'});
    return;
}
    else if (isNaN(age) || age < 1 || age > 120) { //not sure if this works
        res.status(400).json({ errorMessage: 'Age must be a number between 1 and 120'});
        return;
    }
    else {
newFriend
    .save()
    .then(savedFriend => {
        res.status(201).json(savedFriend)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'There was an error while saving the friend to the database.' });
    })};
});

router
.route('/:id')
.get((req, res) => {
    const { id } = req.params;
    Friend.findById(id)
        .then(foundFriend => {
            console.log(foundFriend);
            if (foundFriend === null) {
                res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.'});
                return;
            }
            res.status(500).json({ errorMessage: 'The friend information could not be retrieved.'})
        })
    })
.delete((req, res) => {

})
.put((req, res) => {

})

module.exports = router;