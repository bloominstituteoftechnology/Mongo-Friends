// import { RSA_NO_PADDING } from 'constants';

const router = require('express').Router();

const Friend = require('./ModelFriend');

router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/:id')
    .get((req,res) => {
        
        const {id} = req.params;
        Friend.findById(id, (err, friend) => {
            // if (err) throw err;
            console.log('id', id, friend)
            if (!friend) return res.status(404).json({message: "The friend with the specified ID does not exist." })
            if (err) return res.status(500).json({errorMessage: "The friend information could not be retrieved."})
            return res.status(200).json(friend);
        });

        
    })
    .delete((req,res) => {
        // res.status(200).json(res); // Not sure if it's req or res, NOT COMPLETE
        const {id} = req.params;
        Friend.findByIdAndRemove(id, (err , friend) => {
            // console.log('this is the delete method, req is and res is: ', req, res)
            console.log(friend);
            if (!friend) {
                return res.status(404).json({message: "The friend with the specified ID does not exist." })
            }
            if (err) {
                res.status(500).json({errorMessage: "The friend could not be removed"})
            };
            const response = {
                message: "Todo successfully deleted",
                id: friend._id
            };
            // res.remove()
            return res.status(200).send(response);
        })
    })
    .put((req,res) => {
        // res.status(200).json(res); //NOT FUNCTIONAL
        const {id} = req.params;
        const {firstName, lastName, age} = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400);
            res.json({errorMessage: "Please provide firstName, lastName, and age for the friend."});
            return;
        }
        if (typeof age !== 'number' || age < 1 || age > 120) {
            // console.log('the age is a number');
            res.status(400);
            res.json({errorMessage: "Age must be a number between 1 and 120"});
            return;
        }
        // console.log('update id, updatebody : ', id, update.firstName)
        Friend.findByIdAndUpdate(id, {firstName: firstName, lastName: lastName, age: age}, {new: true}, (err, friend) => {
            if (!friend) {
                return res.status(404).json({message: "The friend with the specified ID does not exist." })
            }
            

            if (err) return res.status(500).json({errorMessage: "The friend information could not be modified." });
            // console.log('This is an update, friend and error: ', friend, err);
            return res.status(200).json(friend)
        })
        // .catch(err => {
        //     res.status(500).json(err)
        // })
    });
    
    function get(req, res) {
        Friend.find().then(friends => {
            res.status(200).json(friends)
        })
        .catch(err => {
            return res.status(500).json({errorMessage: "The friends information could not be retrieved."});

        })
    };

    function post(req,res) {
        // res.status(201).json(frie)
        const friendData = req.body;
        const {firstName, lastName, age} = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400);
            res.json({errorMessage: "Please provide firstName, lastName, and age for the friend."});
            return;
        }
        // console.log('age is: ', age, typeof age)
        if (typeof age !== 'number' || age < 1 || age > 120) {
            // console.log('the age is a number');
            res.status(400);
            res.json({errorMessage: "Age must be a number between 1 and 120"});
            return;
        }
        const friend = new Friend(friendData);

        friend.save().then(friend => {
            res.status(201).json(friend)
        })
        .catch(err => {
            return res.status(500).json({errorMessage: "There was an error while saving the friend to the database." });
        });
    };
    module.exports = router;