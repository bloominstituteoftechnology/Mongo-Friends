const router = require( 'express' ).Router();
const Friend = require( './friendModel' );


router
  .route( '/' )
  .get( ( req, res ) =>
  {
    Friend.find()
      .then( friends =>
      {
        res.status( 200 ).json( bears );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { error: 'Error' } )
      } );
  } )
  .post( ( req, res ) =>
  {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend( { firstName, lastName, age } );
    newFriend
      .save()
      .then( savedFriend =>
      {
        res.status( 201 ).json( savedFriend );
      } )
      .catch( err =>
      {
        res.status( 422 ).json( { err: 'Error' } );
      } )
  } )
module.exports = router;
