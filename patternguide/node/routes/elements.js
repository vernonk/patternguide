/**
* These routes are for the UI pages rendered by PatternGuide
**/
var path = require( "path" ),
    request = require( "request" ),
    express = require( "express" ),
    router = express.Router(),
    config = patternguide.get( "config" ),
    baseUrl = config.baseUrl,
    baseApiUrl = baseUrl + "/api/elements/",
    viewHelpers = require( path.join( __dirname, "..", "utils/view-helpers" ) );

// /elements
// /modules/
// /elements/name
// /patterns/
// /layouts/
// /wires/layoutname
// /comps/layoutname <- comp generator, see Trello
// /elements/name/any/number/of/routers/out/it/will/go/

// this router is specific to /elements anything shared should
// be included util middleware between pieces this way there
// are zero conditionals based on responsibility in the routes, it's all specific
// to what elements need. No other concerns.


/**************************************
* GET routes
***************************************/

router.get( "/", function ( req, res ) {
  // get list from api
  request( baseApiUrl, function ( err, resp, body ) {
    if ( err ) throw err;
    if ( resp.statusCode === 200 ) {
      res.render( "hub", {
        title: "Elements Hub Page",
        message: "The elements hub pages message. Read me?",
        helpers: viewHelpers,
        data: body
      });
    }
  });
});

router.get( "/:group", function ( req, res ) {
  request( baseApiUrl + req.params.group, function ( err, resp, body ) {
    if ( err ) throw err;
    if ( resp.statusCode === 200 ) {
      res.render( "hub", {
        title: "Elements Group Page",
        message: "Elements Group Page",
        helpers: viewHelpers,
        data: body
      });
    }
  });
});

router.get( "/:group/:item", function ( req, res ) {
  request( baseApiUrl + req.params.group + "/" + req.params.item, function ( err, resp, body ) {
    if ( err ) throw err;
    if ( resp.statusCode === 200 ) {
      res.render( "elements-item", {
        title: "Elements Item Page",
        message: "Elements Item Page",
        helpers: viewHelpers,
        data: body
      });
    }
  });
});

/**************************************
* POST routes
***************************************/

router.post( /([A-Za-z0-9\-_]+)(?:\/)?([A-Za-z0-9\-_]+)?(?:\/)?/, function ( req, res ) {

  var name = getName( this.url );

  if ( !name ) {
    // no name provided, this is creation only, error out
    this.body = "Elements Creation --- WIHOUT NAME -- ERROR OUT!!!";

  } else {
    // we have a name, `this` should have some data along with it
    // that gives us what we need to create a new component
    // validation should have been done on the client to make sure
    // a unique was coming through. validate, but shouldn't need
    this.body = "Element specific page";

  }

});


/**************************************
* PUT routes
***************************************/



/**************************************
* DELETE routes
***************************************/


// Finally export our router
module.exports = router;
