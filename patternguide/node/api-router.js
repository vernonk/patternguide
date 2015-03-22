/**
* This is where the API is defined for patternguide to access all data
* points for elements, modules, patterns, layouts.
*
* The routes are set up using `router.verb` methods where the verb is an
* HTTP verb (e.g. router.get(), router.post())
**/
var router = require( "koa-router" )();

// Clean this up... just stubbing out some paths here.


// Could use named routes to make updating application code easier
// Instead, I opted to simple define the API simple (rather than definining a
// bunch of custom named routes -- unless I misunderstand it which I could)

// Elements
router.post( "/api/element/:name", function *( next ) {

  yield next;

});

router.get( "/api/element/:name", function *( next ) {

  yield next;

});

router.put( "/api/element/:name", function *( next ) {

  yield next;

});

router.delete( "/api/element/:name", function *( next ) {

  yield next;

});

// Modules
router.post( "/api/module/:name", function *( next ) {

  yield next;

});

router.get( "/api/module/:name", function *( next ) {

  yield next;

});

router.put( "/api/module/:name", function *( next ) {

  yield next;

});

router.delete( "/api/module/:name", function *( next ) {

  yield next;

});

// Patterns
router.post( "/api/pattern/:name", function *( next ) {

  yield next;

});

router.get( "/api/pattern/:name", function *( next ) {

  yield next;

});

router.put( "/api/pattern/:name", function *( next ) {

  yield next;

});

router.delete( "/api/pattern/:name", function *( next ) {

  yield next;

});

// Layouts
router.post( "/api/layout/:name", function *( next ) {

  yield next;

});

router.get( "/api/layout/:name", function *( next ) {

  yield next;

  // code down here happens on the back loop after response is sent to clients

});

router.put( "/api/layout/:name", function *( next ) {

  yield next;

});

router.delete( "/api/layout/:name", function *( next ) {

  yield next;

});

// Finally export our router
module.exports = router;
