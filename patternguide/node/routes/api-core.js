/**
* This is where the API is defined for patternguide to access all data
* points for elements, modules, patterns, layouts.
*
* The routes are set up using `router.verb` methods where the verb is an
* HTTP verb (e.g. router.get(), router.post())
**/
var fs = require( "fs" ),
    path = require( "path" ),
    _ = require( "lodash" ),
    express = require( "express" ),
    router = express.Router();

// Could use named routes to make updating application code easier
// Instead, I opted to simple define the API simple (rather than definining a
// bunch of custom named routes -- unless I misunderstand it which I could have)

//elements
//modules
//patterns
//layouts
//comps
//wires

const IGNORE = [ ".DS_Store" ];

// Elements base, return full list
router.get( "/elements", function ( req, res ) {

  var resp = [],
      elementGroups = _.remove( fs.readdirSync( path.join( __dirname, "..", "..", "..", "src/elements" ) ),
                                function ( dir ) {
                                  return IGNORE.indexOf( dir ) === -1;
                                });

  for ( var i = 0, l = elementGroups.length; i < l; i++ ) {
    resp[ i ] = {};
    resp[ i ].id = i;
    resp[ i ].name = elementGroups[ i ];
    resp[ i ].items = _.remove( fs.readdirSync( path.join( __dirname, "..", "..", "..", "src/elements", elementGroups[ i ] ) ),
                              function ( dir ) {
                                return IGNORE.indexOf( dir ) === -1;
                              });
  }

  res.json( resp );
});

// Element group page, another hub but more filtered
router.get( "/elements/:group", function ( req, res ) {
  var resp = [],
      elementGroups = _.remove( fs.readdirSync( path.join( __dirname, "..", "..", "..", "src/elements", req.params.group ) ),
                                function ( dir ) {
                                  return IGNORE.indexOf( dir ) === -1;
                                });

  for ( var i = 0, l = elementGroups.length; i < l; i++ ) {
    resp[ i ] = {};
    resp[ i ].id = i;
    resp[ i ].name = elementGroups[ i ];
    resp[ i ].group = req.params.group;
  }

  res.json( resp );
});

// Get the details about a specific element, render just the MD?
// Look for examples dir and iframe in?
router.get( "/elements/:group/:item", function ( req, res ) {

  var pathFromRoot = path.join( __dirname, "..", "..", "..", "src/elements", req.params.group, req.params.item ),
      paths = {
        readme: path.join( pathFromRoot, "readme.md" ),
        config: path.join( pathFromRoot, "config.json" ),
        styles: path.join( pathFromRoot, "styles", req.params.item + ".scss" ),
        js: path.join( pathFromRoot, "js", req.params.item + ".js" ),
        tests: path.join( pathFromRoot, "js", "tests", "spec.js" ),
      },
      resp = {
        id: req.params.item,
        css: null,
        js: null,
        tests: null,
        partial: null
      };

  // get the readme
  if ( fs.existsSync( paths.readme ) ) {
    resp.readme = fs.readFileSync( paths.readme, { encoding: "utf8" } );
  } else {
    resp.readme = null;
  }

  // get the config
  if ( fs.existsSync( paths.config ) ) {
    resp.config = fs.readFileSync( paths.config, { encoding: "utf8" } );
  } else {
    resp.config = null;
  }

  // do we have a partial?
  if ( fs.existsSync( paths.partial ) ) {
    resp.partial = fs.readFileSync( paths.partial, { encoding: "utf8" } );
  }

  // do we have any styles?
  if ( fs.existsSync( paths.styles ) ) {
    paths.styles.replace( /(?:src)([A-Za-z\-\/]+)/, function ( full, path ) {
      resp.css = path + ".css";
    });
  }

  // do we have any functionality?
  if ( fs.existsSync( paths.js ) ) {
    paths.js.replace( /(?:src)([A-Za-z\-\/\.]+)/, function ( full, path ) {
      resp.js = path;
    });
  }

  // do we have any unit tests?
  if ( fs.existsSync( paths.tests ) ) {
    paths.tests.replace( /(?:src)([A-Za-z\-\/\.]+)/, function ( full, path ) {
      resp.tests = path;
    });
  }

  res.json( resp );
})


module.exports = router;
