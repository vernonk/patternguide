/**
* These routes are for the UI pages rendered by PatternGuide
**/
var express = require( "express" ),
    path = require( "path" ),
    router = express.Router(),
    viewHelpers = require( path.join( __dirname, "..", "utils/view-helpers" ) );

    // middleware specific to this router
    // router.use(function timeLog(req, res, next) {
    //   console.log('Time: ', Date.now());
    //   next();
    // })

// /elements
// /modules/
// /elements/name
// /patterns/
// /layouts/
// /wires/layoutname
// /comps/layoutname <- comp generator, see Trello
// /elements/name/any/number/of/routers/out/it/will/go/

// router is defined with /elements and such as a base
// this is the remaining bits that come through
// such as name/id

// this router is specific to /elements anything shared should
// be included util middleware between pieces this way there
// are zero conditionals in the routes, it's all specific
// to what elements need. No other concerns.
router.get( "/", function ( req, res ) {

  res.render( "hub", {
    title: "hey",
    message: "hello world",
    helpers: viewHelpers
  });



});

router.get( "/:group", function ( req, res ) {
  res.send( "Elements group page: " + req.params.group );
});

router.get( "/:group/:item", function ( req, res ) {
  res.send( "Elements item page: " + req.params.item + " in the " + req.params.group + " group" );
});

// this pattern should match any path, explicity with reasoning like above.
// router.get( /([A-Za-z0-9\-_]+)(?:\/)?([A-Za-z0-9\-_]+)?(?:\/)?/, function ( req, res ) {
//   console.log( req.url );
//   res.send( "Other page" );
//   // var type = this.captures[ 0 ],
//   //     name = this.captures[ 1 ],
//   //     // not used, included as a reference since tool was heavily inspired by the work
//   //     atomicDesign = [ "atoms", "molecules", "organisms", "templates", "pages" ],
//   //     // pages are not included in patternguide as it's a different concern
//   //     // this will hopefully be a sister tool in the future that uses patternguide's API
//   //     // to drive the modular creation of a static site. :)
//   //     allowedTypes = [ "elements", "modules", "patterns", "layouts" ],
//   //     isAllowedType = type && allowedTypes.indexOf( type ) !== -1,
//   //     isHub = ( type && name ) ? false : true;
//   //     // view = views.init(); // something like this, then view can use the methods
//   //
//   // if ( isAllowedType && isHub ) {
//   //   // hub view
//   //   // yield views.render({
//   //   //   ctx: this,
//   //   //   type: type,
//   //   //   path: "hub"
//   //   // });
//   //   //
//   //   // yield next;
//   // } else if ( isAllowedType && name ) {
//   //   // specific page
//   //   // this.body = "SPECIFIC PAGE FOR " + type + " : " + name;
//   //   //
//   //   // yield next;
//   //
//   // } else {
//   //   return this.status = 404;
//   //   // yield next;
//   // }
//
// });

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


  // yield next;
});

// Finally export our router
module.exports = router;
