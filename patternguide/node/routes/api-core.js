/**
* This is where the API is defined for patternguide to access all data
* points for elements, modules, patterns, layouts.
*
* The routes are set up using `router.verb` methods where the verb is an
* HTTP verb (e.g. router.get(), router.post())
**/

var fs = require( "fs" ),
    path = require( "path" ),
    dirParsers = require( path.join( __dirname, "..", "core", "dir-parsers.js" ) ).get,
    express = require( "express" ),
    router = express.Router();

const IGNORE = [ ".DS_Store" ],
      PATHTOROOT = path.join( __dirname, "..", "..", ".." );

// Could use named routes to make updating application code easier
// Instead, I opted to simple define the API simple (rather than definining a
// bunch of custom named routes -- unless I misunderstand it which I could have)

//elements
//modules
//patterns
//layouts
//comps
//wires

// Base API routes
// var bases = [ "elements", "modules", "patterns", "layouts", "wires", "comps" ];
router.get( "/:base", function ( req, res ) {
  // foundation route for now, once wires & comps are getting there extend & check foundation further
  res.json( dirParsers( req.params.base ) );
});

// Filtered Group
router.get( "/:base/:group", function ( req, res ) {
  res.json( dirParsers( req.params.base, req.params.group ) );
});

// Get all details about a specific element
router.get( "/:base/:group/:item", function ( req, res ) {
  res.json( dirParsers( req.params.base, req.params.group, req.params.item ));
});

module.exports = router;
