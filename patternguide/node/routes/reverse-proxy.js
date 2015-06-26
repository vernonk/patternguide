/**
* These routes are for the UI pages rendered by PatternGuide
**/
var express = require( "express" ),
    path = require( "path" ),
    router = express.Router(),
    pgConfig = require( path.join( __dirname, "..", "..", "..", "config/patternguide" ) );

// This router handles the fallthrough when no routes will match
// For our fallthrough, we treat this layer as our reverse proxy layer
// This gives us a single application where we can run local dev and debugging
router.get( "*", function ( req, res ) {

  var request = require( "request" ),
      colors = require( "colors" ),
      proxyHost = pgConfig.proxyHost || "localhost",
      proxyProtocol = ( pgConfig.proxySecure ) ? "http://" : "http://",
      http = ( pgConfig.proxySecure ) ? require( "https" ) : require( "http" );

  console.log( "Reverse Proxying: ".green + proxyProtocol + proxyHost + req.originalUrl );

	// TODO: Have to figure out how to make requests to things like a .php be converted to return the .html version in a localized folder

  // res.send( response );
  // this should look for a proxyhost flag
  // this value should be domain name that we want to preview against
  // store config in res.locals so middleware earlier on can modify it
  // to take account for any cli flags passed in, that way we don't do comparisons here
  // then we pipe the request through in the response
  req.pipe( request[ req.method.toLowerCase() ]({
    url: proxyProtocol + proxyHost + req.originalUrl,
    timeout: 5000
  }, function ( err ) {
    if ( err ) {
      res.end( "<h1>Error " + err.code + ": Suck it." );
    }
  }) ).pipe( res );

});

// Finally export our router
module.exports = router;
