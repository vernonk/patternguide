/**
* This is where we define all core methods for parsing directories
**/

var fs = require( "fs" ),
    path = require( "path" ),
    _ = require( "lodash" ),
    async = require( "async" ),
    deasync = require( "deasync" ),
		hanson = require( "hanson" ),
		marked = require( "marked" ),
    parsers = {};

const IGNORE = [ ".DS_Store" ],
      PATHTOROOT = path.join( __dirname, "..", "..", ".." );

// get all details necessary for section details  ( "properties", "elements")
// e.g. "properties", "elements", "modules", "patterns", "layouts", "wires", "comps"
parsers.section = function ( section ) {
  var resp = [],
      elementGroups = _.remove( fs.readdirSync( path.join( PATHTOROOT, "src", section ) ),
                                function ( dir ) {
                                  return IGNORE.indexOf( dir ) === -1;
                                });

  for ( var i = 0, l = elementGroups.length; i < l; i++ ) {
    resp[ i ] = {};
    resp[ i ].id = i;
    resp[ i ].name = elementGroups[ i ];
    resp[ i ].items = _.remove( fs.readdirSync( path.join( PATHTOROOT, "src", section, elementGroups[ i ] ) ),
                              function ( dir ) {
                                return IGNORE.indexOf( dir ) === -1;
                              });
  }

  return resp;

};

// get necessary data for filtered groups
parsers.group = function ( section, group ) {
  var resp = [],
      elementGroups = _.remove( fs.readdirSync( path.join( PATHTOROOT, "src", section, group ) ),
                                function ( dir ) {
                                  return IGNORE.indexOf( dir ) === -1;
                                });

  for ( var i = 0, l = elementGroups.length; i < l; i++ ) {
    resp[ i ] = {};
    resp[ i ].id = i;
    resp[ i ].name = elementGroups[ i ];
    resp[ i ].group = group;
  }

  return resp;
}

// get all details about a specific item
parsers.item = function ( section, group, item ) {
  var pathFromRoot = path.join( PATHTOROOT, "src", section, group, item ),
      response = {
        id: item,
				config: null,
				docs: null,
				view: null,
				styles: null,
				scripts: null,
				tests: null
      },
      done = false;

	// execute parallel tasks and build out necessary data to return
	async.parallel({
		config: function ( cb ) {
			var fp = path.join( pathFromRoot, "config.hson" );
			fs.readFile( fp, { encoding: "utf8" }, function ( err, data ) {
				response.err = err;
				if ( data ) {
					response.config = hanson.parse( data );
				}
				cb( err, data );
			});
		},
		docs: function ( cb ) {
			var docsdir = path.join( pathFromRoot, "docs" ),
					level = 0,
					prevLevel = 0,
					menu = {},
					parseDocs = function ( val, obj ) {
						var src = fs.readFileSync( path.join( docsdir, val ), { encoding: "utf8" } );

						// level is going to match the 00_ or 00- pattern in the filename
						// based on it's lenght we will know what level we are on
						level = val.match( /\d{2}_|\d{2}-/ ) && val.match( /\d{2}_|\d{2}-/ ).length;

						if ( !level ) {
							return;
						}

						//the menu object needs to have
						/*
						If my level is 0, I am not a child, otherwise add me to the children of my parent (in my config block)

						 */





						// need to figure out how to build nested tab structure into object based off of filename
						// structure... should be simple functional piece that composes it all together

						menu[ val ] = {
							src: src,
							html: marked( src )
						}

						// set our prev level to match this level now
						prevLevel = level;

					};

			fs.readdir( docsdir, function ( err, files ) {
				response.err = err;
				response.docs = {};
				files.forEach( parseDocs );
				response.docs = menu; // should be built out from the parseDocs iterations
				cb( err, files );
			});
		},
		view: function ( cb ) {
			var fp = path.join(pathFromRoot, "view", item + "." + patternguide.get("config").templatingFileExt),
					helpers = require( "../utils/view-helpers" );
			fs.readFile(fp, {encoding: "utf8"}, function (err, data) {
				response.err = err;
				response.view = {
					src: data,
					rendered: helpers.render( "#PGSG-" + fp )
				};
				cb(err, data);
			});
		},
		styles: function ( cb ) {
			var dir = path.join( pathFromRoot, "styles" );
			fs.readdir( dir, function ( err, files ) {
				response.err = err;
				response.styles = files.map(function ( val ) {
					return "/" + section + "/" + group + "/" + item + "/styles/" + val;
				});
				cb( err, files );
			});
		},
		scripts: function ( cb ) {
			var dir = path.join( pathFromRoot, "scripts" );
			fs.readdir( dir, function ( err, files ) {
				response.err = err;
				response.scripts = files.map(function ( val ) {
					return "/" + section + "/" + group + "/" + item + "/scripts/" + val;
				});
				cb( err, files );
			});
		},
		tests: function ( cb ) {
			var dir = path.join( pathFromRoot, "tests" );
			fs.readdir( dir, function ( err, files ) {
				response.err = err;
				response.tests = files;
				cb( err, files );
			});
		}
	}, function ( err, results ) {
		// results will be { config: val, docs: val, etc: val }
		// send back the json, will contain an "err" prop
    done = true;
	});

  while( done === false ) {
    deasync.runLoopOnce();
  }

  return response;

};

parsers.get = function ( section, group, item ) {
  // based off of number arguments.length, you easily know what method to call
  if ( arguments.length === 1 ) {
    return parsers.section( section );
  } else if ( arguments.length === 2 ) {
    return parsers.group( section, group );
  } else if ( arguments.length === 3 ) {
    return parsers.item( section, group, item );
  }
};

module.exports = parsers;
