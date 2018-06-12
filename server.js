const express = require('express');
const helmet = require('helmet');
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );

const friendController = ( './friends/friendController' );

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/dbbears', {}, err =>
{
  if ( err ) console.log( err );
  console.log( 'Mongoose connected us to our DB' );
} );
server.listen( port, () =>
{
  console.log( `\n=== API running on http://localhost:${ port } ===\n` );
} );
