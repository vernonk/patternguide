var viewHelpers = {},
    fs = require( "fs" ),
    path = require( "path" ),
    glob = require( "glob" ),
    deasync = require( "deasync" );

// build out global navigation
viewHelpers.nav = {};

viewHelpers.nav.global = (function () {
  // read out all the pieces and return an array that will be iterated over in the view
  // to show the segmented navigation lists

  var pattern = path.join( __dirname, "..", "..", "..",
                          "src/?(elements|layouts|modules|patterns)/**/" ),
      allItems = glob.sync( pattern, {
        ignore: "**/?(styles|js|tests)" // not ignoring this stuff.
      }),
      globalNavList = {};

  function addToList ( path ) {
    var parts = path.split( "/" ).filter( Boolean ), // cleans out falsy values
        obj = globalNavList,
        len = parts.length;
    parts.forEach(function ( val, i, arr ) {
      if ( typeof obj[ val ] === "undefined" ) {
        obj[ val ] = {};
      }
      obj = obj[ val ];
    });
    return obj;
  }

  // iterate over the array of thingz and build out the actual nav global list
  allItems.forEach(function ( val ) {
    var sanitized = val.substr( val.indexOf( "src/" ) + 4 );
    addToList( sanitized );
  });

  return globalNavList;
})();


// provide a view helper that will allow many supported templating libraries
// use a "render" helper in a single or series of nested partials.
viewHelpers.render = function ( name, opts ) {

  var done = false,
      theHtml;

  opts = opts || {};
  opts.helpers = viewHelpers;

  patternguide.engines[ ".html" ].apply( patternguide, [
    patternguide.get( "views" ) + "/" + name,
    opts,
    function ( err, html ) {
      theHtml = html;
      done = true;
    }
  ]);

  while ( !done ) {
    deasync.runLoopOnce();
  }

  return theHtml;

};

module.exports = viewHelpers;
