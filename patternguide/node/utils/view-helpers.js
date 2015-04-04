var viewHelpers = {},
    deasync = require( "deasync" );


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
