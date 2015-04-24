/**
* A cleaner gulpfile? Inspired by Thomas Boyt's maintainable Gruntfile approach
* which I've used for a while now, I think that a similar separated structure
* makes the most sense for application maintenance and growth. Thoughts?
* Thomas Boyt's article: http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
*
* Directory structure:
*
* |--tasks/
* |    |--patternguide/
* |        |customapptask.js  # Exports custom gulp task
* |    |--plugins/
* |        |uglify.js         # Exports uglify gulp task
* |--gulpfile.js
*
*/
var fs = require( "fs" ),
    path = require( "path" ),
    glob = require( "glob" ),
    deasync = require( "deasync" ),
    gulp = require( "gulp" ),
    plugins = require( "gulp-load-plugins" )(),
    tasks = {},
    config = require( "./config/patternguide" ),
    done = false;

glob( path.join( __dirname, "gulp", "**/*.js" ),
      function ( err, files ) {
        var shortname;
        if ( err ) throw err;
        for ( var i = 0, l = files.length; i < l; i++ ) {
          files[ i ].replace( /([^/]+$)/, function ( full, filename ) {
            shortname = filename.substr( 0, filename.indexOf( "." ) );
          });
          tasks[ shortname ] = require( files[ i ] );
        }
        done = true;
      });

while ( !done ) {
  deasync.runLoopOnce();
}

// tasks are now loaded and ready to be used.
// accessible from the command line as gulp taskname
// but also can be used within the gulpfile itself
// by invoking tasks.taskname();
// e.g. tasks.localize();

// The default task (called when you run `gulp` from cli)
// gulp.task('default', ['watch', 'scripts', 'images']);
gulp.task( "default", [] );
