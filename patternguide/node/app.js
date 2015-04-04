/** kickoff of express app **/
var express = require( "express" ),
    path = require( "path" ),
    cons = require( "consolidate" ),
    pgConfig = require( path.join( __dirname, "..", "..", "config/patternguide" ) ),
    routePrefix = ( /\/$/.test( pgConfig.routePrefix ) ) ? pgConfig.routePrefix : pgConfig.routePrefix + "/";

// global patternguide var available throughout
patternguide = express();

// set HTML to whatever our templating engine is in the config
patternguide.engine( "html", cons[ pgConfig.templating ] );

// set up our app varaibles
patternguide
  .set( "config", pgConfig )
  .set( "view engine", "html" )
  .set( "views", path.join( __dirname, "views" ) );

// piece out how our proxied, style guide and API paths will be matched
patternguide
  .use( express.static( path.join( __dirname, "..", "..", "localized" ) ) ) // use localized files first, then source
  .use( express.static( path.join( __dirname, "..", "..", "dist" ) ) )
  .use( path.join( routePrefix, "api" ), require( path.join( __dirname, "routes/api-core" ) ) )
  .use( routePrefix, require( path.join( __dirname, "routes/home" ) ) )
  .use( path.join( routePrefix, "elements" ), require( path.join( __dirname, "routes/elements" ) ) )
  .use( path.join( routePrefix, "modules" ), require( path.join( __dirname, "routes/elements" ) ) )
  .use( path.join( routePrefix, "patterns" ), require( path.join( __dirname, "routes/elements" ) ) )
  .use( path.join( routePrefix, "layouts" ), require( path.join( __dirname, "routes/elements" ) ) )
  .use( path.join( routePrefix, "wires" ), require( path.join( __dirname, "routes/elements" ) ) )
  .use( path.join( routePrefix, "comps" ), require( path.join( __dirname, "routes/elements" ) ) )
  .use( "*", require( path.join( __dirname, "./routes/reverse-proxy" ) ) );

module.exports = patternguide;
