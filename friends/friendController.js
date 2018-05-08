const router = require('express').Router();

const Friend = require('./friendModel');

//============GET===============
router.get('/', (req, res) => {
    Friend
    .find()
    .then(friends => {
        res.status(200).json(friends)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    })
})

//===========GET BY ID==============
router.get('/:id', (req, res) => {
    Friend
    .findById(req.params.id)
    .then(friend => {
        if(friend){
            res.status(200).json(friend)
        }
        else {
            res.status(404).json({ message: "The friend with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
    })
})

//===========DELETE==================
router.delete('/:id', (req, res) => {
    Friend
    .findByIdAndRemove(req.params.id)
    .then(response => {
        if(response){
            res.status(201).json(response)
        }
        else {
            res.status(404).json({ message: "The friend with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friend could not be removed" })
    })
})

module.exports = router;