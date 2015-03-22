/**
* These routes are for the UI pages rendered by PatternGuide
**/
var router = require( "koa-router" )(),
    views = require( "../plugins/node/views" );

router.get( "/", function *( next ) {
  this.body = "Homepage!";

  yield next;

});

// /elements
// /modules/
// /elements/name
// /patterns/
// /layouts/
// /wires/layoutname
// /comps/layoutname <- comp generator, see Trello
// /elements/name/any/number/of/routers/out/it/will/go/

// this pattern should match any path, explicity with reasoning like above.
router.get( /([A-Za-z0-9\-_]+)(?:\/)?([A-Za-z0-9\-_]+)?(?:\/)?/, function *( next ) {
  var type = this.captures[ 0 ],
      name = this.captures[ 1 ],
      // not used, included as a reference since tool was heavily inspired by the work
      atomicDesign = [ "atoms", "molecules", "organisms", "templates", "pages" ],
      // pages are not included in patternguide as it's a different concern
      // this will hopefully be a sister tool in the future that uses patternguide's API
      // to drive the modular creation of a static site. :)
      allowedTypes = [ "elements", "modules", "patterns", "layouts" ],
      isAllowedType = type && allowedTypes.indexOf( type ) !== -1,
      isHub = ( type && name ) ? false : true;
      // view = views.init(); // something like this, then view can use the methods

  if ( isAllowedType && isHub ) {
    // hub view
    yield views.render({
      ctx: this,
      type: type,
      path: "hub"
    });

    yield next;
  } else if ( isAllowedType && name ) {
    // specific page
    this.body = "SPECIFIC PAGE FOR " + type + " : " + name;

    yield next;

  } else {
    return this.status = 404;
    yield next;
  }

});

router.post( /([A-Za-z0-9\-_]+)(?:\/)?([A-Za-z0-9\-_]+)?(?:\/)?/, function *( next ) {

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


  yield next;
});

// Finally export our router
module.exports = router;
