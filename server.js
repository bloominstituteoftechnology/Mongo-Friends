const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const db = mongoose.connect('mongodb://localhost/friendAPI');

const Friend = require('./friends/friendModel');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const friendRouter = express.Router();

friendRouter.get('/friends', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: 'The information could not be retrieved.' });
    });
});

friendRouter.get('/friends/:id', (req, res) => {
  Friend.findById(req.params.id)
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(err => {
      res.status(500).json({ error: 'The information could not be retrieved.'});
    });
});

app.use('/api', friendRouter);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'API Running...' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
