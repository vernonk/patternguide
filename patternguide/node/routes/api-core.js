/**
* This is where the API is defined for patternguide to access all data
* points for elements, modules, patterns, layouts.
*
* The routes are set up using `router.verb` methods where the verb is an
* HTTP verb (e.g. router.get(), router.post())
**/
var express = require( "express" ),
    router = express.Router();

    // middleware specific to this router
    // router.use(function timeLog(req, res, next) {
    //   console.log('Time: ', Date.now());
    //   next();
    // })

// Clean this up... just stubbing out some paths here.


// Could use named routes to make updating application code easier
// Instead, I opted to simple define the API simple (rather than definining a
// bunch of custom named routes -- unless I misunderstand it which I could)

// Elements
router.post( "/element/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.get( "/element/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.put( "/element/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.delete( "/element/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

// Modules
router.post( "/module/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.get( "/api/module/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.put( "/module/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.delete( "/module/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

// Patterns
router.post( "/pattern/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.get( "/pattern/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.put( "/pattern/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.delete( "/pattern/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

// Layouts
router.post( "/layout/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.get( "/layout/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

  // code down here happens on the back loop after response is sent to clients

});

router.put( "/layout/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

router.delete( "/layout/:name", function ( req, res ) {

  res.send( "Stubbing it out" );

});

// Finally export our router
module.exports = router;
