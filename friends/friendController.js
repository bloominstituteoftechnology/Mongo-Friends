const router = require('express').Router();
const Friend = require('./friendModel.js');

router
	.route('/')
	.get()
	.post();

router
	.route('/:id')
	.get()
	.delete()
	.put();

module.exports = router;
