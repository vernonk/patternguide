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
  .use( routePrefix + "api", require( path.join( __dirname, "routes/api-core" ) ) )
  .use( routePrefix, require( path.join( __dirname, "routes/home" ) ) )
  .use( routePrefix + "elements", require( path.join( __dirname, "routes/elements" ) ) )
  .use( routePrefix + "modules", require( path.join( __dirname, "routes/page-core" ) ) )
  .use( routePrefix + "patterns", require( path.join( __dirname, "routes/page-core" ) ) )
  .use( routePrefix + "layouts", require( path.join( __dirname, "routes/page-core" ) ) )
  .use( routePrefix + "wires", require( path.join( __dirname, "routes/page-core" ) ) )
  .use( routePrefix + "comps", require( path.join( __dirname, "routes/page-core" ) ) )
  .use( "*", require( path.join( __dirname, "./routes/reverse-proxy" ) ) );

  // /elements
  // /modules/
  // /elements/name
  // /patterns/
  // /layouts/
  // /wires/layoutname
  // /comps/layoutname <- comp generator, see Trello
  // /elements/name/any/number/of/routers/out/it/will/go/

module.exports = patternguide;
