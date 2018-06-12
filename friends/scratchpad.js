// res.status(200).json({ route: '/api/bears/' + req.params.id });
// } )
// .delete( ( req, res ) =>
// {
// const { id } = req.params;
// // findByIdAndRemove
// Bear.findByIdAndRemove( id )
//     .then( bearRemoved =>
//     {
//     res.status( 200 ).json( bearRemoved );
//     } )
//     .catch( err =>
//     {
//     res.status( 500 ).json( { status: 'error you cannot delete, id not found' } )
//     } )
// // res.status(200).json({ status: 'please implement DELETE functionality' });
// } )