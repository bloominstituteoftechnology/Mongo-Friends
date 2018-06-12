const router = require( 'express' ).Router();
const Friend = require( './friendsModel' );

router
  .route( '/' )
  .get( ( req, res ) =>
  {
    Friend.find()
      .then( friends =>
      {
        res.status( 200 ).json( friends );
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
      .save() // Returns as a promise
      .then( savedFriend =>
      {
        res.status( 201 ).json( savedFriend );
      } )
      .catch( error =>
      {
        res.status( 400 ).json( { errorMessage: "Please provide firstName, lastName and age for the friend." } );
      } )
    // res.status(201).json({ status: 'please implement POST functionality' });
  } );

router
  .route( '/:id' )
  .get( ( req, res ) =>
  {
    const { id } = req.params;
    Friend.findById( id )
      .then( foundFriend =>
      {
        res.status( 200 ).json( foundFriend );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { errorMessage: "The friends information could not be retrieved." } );
      } )
  } )
  .put( ( req, res ) =>
  {
    const { id } = req.params;
    const updates = ( { firstName, lastName, age } = req.body );
    // findByIdAndUpdate
    Friend
      .findByIdAndUpdate( id, updates, { firstName, lastName, age } = req.body )
      .then( friend =>
      {
        res.json( friend );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { status: 'error didnt find what your looking for' } );
      } )
    // res.json(200).json({ status: 'please implement PUT functionality' });
  } )
  .delete( ( req, res ) =>
  {
    const { id } = req.params;
    const updates = ( { firstName, lastName, age } = req.body );
    // findByIdAndUpdate
    Friend
      .findByIdAndRemove( id, updates, { firstName, lastName, age } = req.body )
      .then( friendRemove =>
      {
        res.json( friendRemoved );
      } )
      .catch( err =>
      {
        res.status( 500 ).json( { status: 'error didnt find what your looking for' } );
      } )
    // res.json(200).json({ status: 'please implement PUT functionality' });
  } )
module.exports = router;
