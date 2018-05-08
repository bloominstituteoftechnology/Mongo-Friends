const router = require('express').Router();

const Friend = require('./friendModel')

router
  .route('/')
  .get(get)
  .post(post)

router
  .route("/:id").get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        if (friend === null)
					res.status(404).json({
						message: 'The friend with the specified ID does not exist.',
					});
				else res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({ message: "The friend information could not be retrieved." }, err);
      })
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => {
        if (friend === null)
					res.status(404).json({
						message: 'The friend with the specified ID does not exist.',
					});
				else res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({ message: "The friend could not be removed" }, err);
      })
  })
  .put((req, res) => {
    if (!(req.body.firstName && req.body.lastName && req.body.age))
			res.status(400).json({
				errorMessage:
					'Please provide firstName, lastName and age for the friend.',
			});

		if (
			!(
				req.body.age === Number(req.body.age) &&
				0 < req.body.age &&
				req.body.age < 121
			)
		)
			res
				.status(400)
        .json({ errorMessage: 'Age must be a number between 1 and 120' });
else {      
    Friend.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(friend => {
        console.log('put!');
        if (friend === null)
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
      else res.status(200).json(friend);
      })
      .catch(err=> {
        res.status(500).json({ errorMessage: "The friend information could not be modified." });
      })
  }});

function get(req, res) {
  Friend.find().then(friends => {
    res.status(200).json(friends);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "The friends information could not be retrieved." }, err); 
})
};

function post(req, res) {
  const friendData = req.body;

  const friend = new Friend(friendData);

if (!(req.body.firstName && req.body.lastName && req.body.age))
			res.status(400).json({
				errorMessage:
					'Please provide firstName, lastName and age for the friend.',
			});

		if (
			!(
				req.body.age === Number(req.body.age) &&
				0 < req.body.age &&
				req.body.age < 121
			)
		)
			res
				.status(400)
				.json({ errorMessage: 'Age must be a number between 1 and 120' });
  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json({errorMessage: "There was an error while saving the friend to the database." }, err);
    })
};

module.exports = router;
