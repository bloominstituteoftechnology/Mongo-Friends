// import { RSA_NO_PADDING } from 'constants';

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
        // res.status(200).json(res); // Not sure if it's req or res, NOT COMPLETE
        const { id } = req.params;
        Friend.findByIdAndRemove(id, (err, friend) => {
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
        const { firstName, lastName, age } = req.body;
        if (!firstName || !lastName || !age) {
            res.status(400);
            res.json({ errorMessage: "Please provide firstName, lastName, and age for the friend." });
            return;
        }
        if (typeof age !== 'number' || age < 1 || age > 120) {
            // console.log('the age is a number');
            res.status(400);
            res.json({ errorMessage: "Age must be a number between 1 and 120" });
            return;
        }
        // console.log('update id, updatebody : ', id, update.firstName)
        // Friend.findByIdAndUpdate(id, { firstName: firstName, lastName: lastName, age: age }, { new: true }, (err, friend) => {

        Friend.findByIdAndUpdate(id, req.body, { new: true }, (err, friend) => {
            if (!friend) {
                return res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }


            if (err) return res.status(500).json({ errorMessage: "The friend information could not be modified." });
            // console.log('This is an update, friend and error: ', friend, err);
            return res.status(200).json(friend)
        })
        // .catch(err => {
        //     res.status(500).json(err)
        // })
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


    .post((req, res) => {
        // res.status(201).json(frie)
        const { id } = req.params;
        console.log('id is: ', id)
        const _id = req.params;


        const friendId = req.params.id;
        // ModelContact
        // const newData = new ModelContact();

        // newData.email = req.body.email;
        // newData.mobile_number = req.body.mobile_number;
        // newData.github_username = req.github_username;
        // newData.facebook_username = req.facebook_username;
        // newData.twitter_handle = req.twitter_handle;

        // newData.save(function (err) {
        //     if (err) {
        //         console.log('Error saving new contact data to friend');
        //         console.log("error: ",err);
        //     } else {
        //         console.log("New contact data saved successfully");
        //         Contact.findById((friend), function(err, data) {
        //             // data.contactInfo.push(newData);

        //             data.save(function (err) {
        //                 if (err) {
        //                     console.log('Error adding new data to friend');
        //                     console.log("error: ",err);
        //                 } else {
        //                     console.log('New data saved successfully');
        //                     // res.redirect('/:id' + friendId);
        //                     return res.status(200).json(data)
        //                 }
        //             })
        //         })

        //     }
        // })


        // const contactData = req.body;
        // const { email, mobile_number, github_username, facebook_username, twitter_handle } = req.body;
        // console.log('contadData: ', contactData)
        // const { email, mobile_number, github_username, facebook_username, twitter_handle } = req.body;
        // Friend.findByIdAndUpdate(id, {_email: email, mobile_number: mobile_number, github_username: github_username, facebook_username: facebook_username, twitter_handle: twitter_handle }, { new: true }, (err, friend) => {
        //     if (!friend) {
        //         return res.status(404).json({ message: "The friend with the specified ID does not exist." })
        //     }


        //     if (err) return res.status(500).json({ errorMessage: "The friend information could not be modified." });
        //     // console.log('This is an update, friend and error: ', friend, err);
        //     return res.status(200).json(friend)
        // })
        // if (!email || !mobile_number || !github_username || facebook_username || twitter_handle ) {
        //     res.status(400);
        //     res.json({ errorMessage: "Please provide email, mobile_number, github_username, facebook_username, and twitter_handle for the friend." });
        //     return;
        // }
        // console.log('github_username is: ', github_username, typeof github_username)
        // if (typeof github_username !== 'number' || github_username < 1 || github_username > 120) {
        //     // console.log('the github_username is a number');
        //     res.status(400);
        //     res.json({ errorMessage: "github_username must be a number between 1 and 120" });
        //     return;
        // }
        const friend = new Contact({ _id: _id, email: email, mobile_number: mobile_number, github_username: github_username, facebook_username: facebook_username, twitter_handle: twitter_handle });

        friend.save().then(friend => {
            res.status(201).json(friend)
        })
            .catch(err => {
                return res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
            });
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
        // if (typeof github_username !== 'number' || github_username < 1 || github_username > 120) {
        //     // console.log('the github_username is a number');
        //     res.status(400);
        //     res.json({ errorMessage: "github_username must be a number between 1 and 120" });
        //     return;
        // }
        // console.log('update id, updatebody : ', id, update.email)
        Contact.findByIdAndUpdate(id, { email: email, mobile_number: mobile_number, github_username: github_username }, { new: true }, (err, friend) => {
            if (!friend) {
                return res.status(404).json({ message: "The friend with the specified ID does not exist." })
            }


            if (err) return res.status(500).json({ errorMessage: "The friend information could not be modified." });
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