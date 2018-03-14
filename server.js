const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

server.use(helmet(), cors(), express.json());

server.get('/', (req, res) => {
    res.status(200).send({status: 'API Running'});
});


const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`API running on http://localhost:${port}.`));