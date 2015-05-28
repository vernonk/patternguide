/** kickoff of express app **/
var express = require( "express" ),
    path = require( "path" ),
    cons = require( "consolidate" ),
		pathToRoot = path.join( __dirname, "..", ".." ),
    pgConfig = require( path.join( pathToRoot, "config/patternguide" ) ),
    routePrefix = ( /\/$/.test( pgConfig.routePrefix ) ) ? pgConfig.routePrefix : pgConfig.routePrefix + "/",
		cliopts, localizeddirname = pgConfig.proxyHost;

// global patternguide var available throughout
patternguide = express();

// set HTML to whatever our templating engine is in the config
patternguide.engine( "html", cons[ pgConfig.templating ] );

// set up our app varaibles
patternguide
  .set( "config", pgConfig )
  .set( "view engine", pgConfig.templatingFileExt )
  .set( "views", path.join( __dirname, "views" ) );

// determine the appropriate localized dirname
cliopts = patternguide.get( "config" ).cliopts;
if ( cliopts && cliopts.proxyhost ) {
	localizeddirname = cliopts.proxyhost;
}

// piece out how our proxied, style guide and API paths will be matched
patternguide
  .use( express.static( path.join( pathToRoot, "localized", localizeddirname ) ) ) // use localized files first, then source
  .use( express.static( path.join( pathToRoot, "dist" ) ) )
  .use( express.static( path.join( pathToRoot, "src" ) ) )
  .use( express.static( path.join( pathToRoot, "sandbox" ) ) )
  .use( path.join( routePrefix, "appsets" ), express.static( path.join( __dirname, ".." ) ) )
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
