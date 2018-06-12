const express = require( 'express' );
const helmet = require( 'helmet' );
const cors = require( 'cors' );
const friendController = require( './friends/friendsController' );
const mongoose = require( 'mongoose' );

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use( '/api/friends', friendController );

const port = process.env.PORT || 5555;
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/dbfriends', {}, err =>
{
  if ( err ) console.log( err );
  console.log( 'mongoose connected to our DB' );
} );
server.listen( port, () => console.log( `\n=== API up on port: ${ port } ===\n` ) );
