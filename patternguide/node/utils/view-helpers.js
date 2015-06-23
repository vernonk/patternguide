var viewHelpers = {},
    fs = require( "fs" ),
    path = require( "path" ),
    glob = require( "glob" ),
    deasync = require( "deasync" ),
    dirParsers = require( path.join( __dirname, "..", "core", "dir-parsers.js" ) ).get,
    config = patternguide.get( "config" ),
    baseUrl = config.baseUrl,
    baseApiUrl = baseUrl + "/api/";

// build out global navigation
viewHelpers.api = {};

viewHelpers.api.getSection = function ( section ) {
  return dirParsers( section );
};

// provide a view helper that will allow many supported templating libraries
// use a "render" helper in a single or series of nested view.
viewHelpers.render = function ( name, opts ) {

  var done = false,
      theHtml,
			viewPath = ( /^#PGSG-/.test( name ) ) ? name.substr( 6 ) : patternguide.get( "views" ) + "/" + name;

  opts = opts || {};
  opts.helpers = viewHelpers;

	//TODO: If this is a core styleguide view, ALWAYS use base style guide templating language, otherwise use set engine

  patternguide.engines[ ".html" ].apply( patternguide, [
    viewPath,
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
