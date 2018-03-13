const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json({ status: 'API Running' });
});


const port = process.env.PORT || 5005;
server.listen(port, () => {
    console.log(`API running on http://localhost:${port}.`);
});
