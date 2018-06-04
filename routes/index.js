const routes = require('express').Router();
const friends = require('./friends');

routes.use('/api/friends', friends);

routes.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = routes;