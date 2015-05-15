
var gulp = require( "gulp" );

module.exports = gulp.task( "watchers", [], function () {

  function addWatcher( watcherObj ) {
    watcherObj.watcher = gulp.watch( watcherObj.pattern, watcherObj.tasks );
    watcherObj.watcher.on( "change", function ( e ) {
      console.log( "File " + e.path + " was " + e.type );
    });
  }

  var watchers = {};

  watchers.js = {};
  watchers.js.pattern = "src/**/*.js";
  watchers.js.tasks = [ "" ];

  watchers.scss = {};
  watchers.scss.pattern = "src/**/*.scss";
  watchers.scss.tasks = [ "" ];

  for ( var key in watchers ) {
    if ( watchers.hasOwnProperty( key ) ) {
      addWatcher( watchers[ key ] );
    }
  }

});
