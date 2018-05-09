
const router = require('express').Router();

const Friend = require('./ModelFriend');
const Contact = require('./ModelContact');
const ModelContact = require('./ModelContact');
router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/:id')
    .get((req, res) => {

        const { id } = req.params;
        Friend.findById(id, (err, friend) => {
            // if (err) throw err;
            console.log('id', id, friend)
            if (!friend) return res.status(404).json({ message: "The friend with the specified ID does not have any contact." })
            if (err) return res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
            return res.status(200).json(friend);
        });


    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend.findByIdAndRemove(id, (err, friend) => {
            console.log(friend);
            if (!friend) {
                return res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }
            if (err) {
                res.status(500).json({ errorMessage: "The friend could not be removed" })
            };
            const response = {
                message: "Todo successfully deleted",
                id: friend._id
            };
            // res.remove()
            return res.status(200).send(response);
        })
    })
    .put((req, res) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400);
            res.json({ errorMessage: "Please provide firstName, lastName, and age for the friend." });
            return;
        }
        if (typeof age !== 'number' || age < 1 || age > 120) {
            res.status(400);
            res.json({ errorMessage: "Age must be a number between 1 and 120" });
            return;
        }
        

        Friend.findByIdAndUpdate(id, req.body, { new: true }, (err, friend) => {
            if (!friend) {
                return res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }


            if (err) return res.status(500).json({ errorMessage: "The friend information could not be modified." });
            // console.log('This is an update, friend and error: ', friend, err);
            return res.status(200).json(friend)
        })
        
    });

router
    .route(`/:id/contactInfo`)
    .get((req, res) => {
        const { id } = req.params;
        console.log('id is: ', id)
        Contact.findById(id, (err, friend) => {
            // if (err) throw err;
            console.log('id', id, friend)
            if (!friend) return res.status(404).json({ message: "The friend with the specified ID does not exist in the contacts." })
            if (err) return res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
            return res.status(200).json(friend);
        });
    })

    .post((req, res, next) => {
        const { email, mobile_number, github_username, facebook_username, twitter_handle } = req.body;
        
        const _id = req.params.id;
                const friendData = new Contact({ _id: _id, email: email, mobile_number: mobile_number, github_username: github_username, facebook_username: facebook_username, twitter_handle: twitter_handle });

        const contactI = new Contact(friendData);
        friendData.save().then(friend => {
           return res.status(201).json(friend)
        })
            .catch(err => {
                return res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
            });

        console.log('these are the params: ', req.params)        
    })

    .delete((req, res) => {
        // res.status(200).json(res); // Not sure if it's req or res, NOT COMPLETE
        const { id } = req.params;
        Contact.findByIdAndRemove(id, (err, friend) => {
            // console.log('this is the delete method, req is and res is: ', req, res)
            console.log(friend);
            if (!friend) {
                return res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }
            if (err) {
                res.status(500).json({ errorMessage: "The friend could not be removed" })
            };
            const response = {
                message: "Todo successfully deleted",
                id: friend._id
            };
            // res.remove()
            return res.status(200).send(response);
        })
    })
    .put((req, res) => {
        // res.status(200).json(res); //NOT FUNCTIONAL
        const { id } = req.params;
        const { email, mobile_number, github_username } = req.body;
        if (!email || !mobile_number || !github_username) {
            res.status(400);
            res.json({ errorMessage: "Please provide email, mobile_number, and github_username for the friend." });
            return;
        }
        
        Contact.findByIdAndUpdate(id, { email: email, mobile_number: mobile_number, github_username: github_username }, { new: true }, (err, friend) => {
            if (!friend) {
                return res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }


            if (err) return res.status(500).json({ errorMessage: "The friend information could not be modified." });
            // console.log('This is an update, friend and error: ', friend, err);
            return res.status(200).json(friend)
        })
        
    });







function get(req, res) {
    Friend.find().then(friends => {
        res.status(200).json(friends)
    })
        .catch(err => {
            return res.status(500).json({ errorMessage: "The friends information could not be retrieved." });

        })
};

function post(req, res) {
    // res.status(201).json(frie)
    const friendData = req.body;
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
        res.status(400);
        res.json({ errorMessage: "Please provide firstName, lastName, and age for the friend." });
        return;
    }
    // console.log('age is: ', age, typeof age)
    if (typeof age !== 'number' || age < 1 || age > 120) {
        // console.log('the age is a number');
        res.status(400);
        res.json({ errorMessage: "Age must be a number between 1 and 120" });
        return;
    }
    const friend = new Friend(friendData);

    friend.save().then(friend => {
        res.status(201).json(friend)
    })
        .catch(err => {
            return res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
        });
};
module.exports = router;