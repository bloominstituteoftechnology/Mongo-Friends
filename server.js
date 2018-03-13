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

const friendRouter = require('./friends/friendRoutes')(Friend);

app.use('/api', friendRouter);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'API Running...' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
