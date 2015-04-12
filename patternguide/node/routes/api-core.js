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
    async = require( "async" ),
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

const IGNORE = [ ".DS_Store" ],
      PATHTOROOT = path.join( __dirname, "..", "..", ".." );

// Base API routes
// var bases = [ "elements", "modules", "patterns", "layouts", "wires", "comps" ];
router.get( "/:base", function ( req, res ) {
  // base route for now, once wires & comps are getting there extend & check base further
  var base = req.params.base,
      resp = [],
      elementGroups = _.remove( fs.readdirSync( path.join( PATHTOROOT, "src", base ) ),
                                function ( dir ) {
                                  return IGNORE.indexOf( dir ) === -1;
                                });

  for ( var i = 0, l = elementGroups.length; i < l; i++ ) {
    resp[ i ] = {};
    resp[ i ].id = i;
    resp[ i ].name = elementGroups[ i ];
    resp[ i ].items = _.remove( fs.readdirSync( path.join( PATHTOROOT, "src", base, elementGroups[ i ] ) ),
                              function ( dir ) {
                                return IGNORE.indexOf( dir ) === -1;
                              });
  }

  res.json( resp );
});

// Filtered Group
router.get( "/:base/:group", function ( req, res ) {
  var resp = [],
      elementGroups = _.remove( fs.readdirSync( path.join( PATHTOROOT, "src", req.params.base, req.params.group ) ),
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

// Get the details about a specific element
router.get( "/:base/:group/:item", function ( req, res ) {

  var pathFromRoot = path.join( PATHTOROOT, "src", req.params.base, req.params.group, req.params.item ),
      filemap = {
        readme: path.join( pathFromRoot, "readme.md" ),
        config: path.join( pathFromRoot, "config.json" ),
        itemView: path.join( pathFromRoot, "item.html" ),
        collectionView: path.join( pathFromRoot, "collection.html" ),
        scss: path.join( pathFromRoot, "styles", req.params.item + ".scss" ),
        js: path.join( pathFromRoot, "js", req.params.item + ".js" ),
        tests: path.join( pathFromRoot, "js", "tests", "spec.js" ),
      },
      response = {
        id: req.params.item,
        readme: null,
        config: null,
        itemView: null,
        collectionView: null,
        scss: null,
        css: null,
        js: null,
        tests: null
      }
      sanitize = function ( str ) {
        return str.replace( /(?:src)([A-Za-z\-\/]+)/, function ( full, path ) {
          return path;
        });
      };

  for ( var key in filemap ) {
    if ( filemap.hasOwnProperty( key ) ) {
      if ( fs.existsSync( filemap[ key ] ) ) {
        // if we are the partial or config, we'll read the file in
        // otherwise, if it's the css, js or tests we'll pass the string back
        if ( key === "readme" || key === "config" ) {
          response[ key ] = fs.readFileSync( filemap[ key ], { encoding: "utf8" } );
        } else {
          response[ key ] = filemap[ key ].substr( filemap[ key ].indexOf( "src/" ) + 3 );
          if ( key === "scss" ) {
            response.css = filemap[ key ]
                            .substr( filemap[ key ].indexOf( "src/" ) + 3 )
                            .replace( ".scss", ".css");
          }
        }
      }
    }
  }

  res.json( response );
})


module.exports = router;
