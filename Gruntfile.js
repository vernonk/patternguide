// Optimized Grunt configuration for maintainability
// Read http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
// to see how the setup and configuration works.
// This will make adding your own grunt tasks an easy task by adding
// their own module file to the ./tasks/ directory. See existing one's for
// an example of how you can build your own.
// Unless you're adding an aliased task, there isn't much chance you'll
// be spending much time in this actual grunt file.
"use strict";

module.exports = function ( grunt ) {

  // This loads in all of our options for grunt tasks
  // stored in ./tasks/options and extends into the config
  function loadOpts ( path ) {
    var glob = require( "glob" ),
        obj = {},
        key;

    glob.sync("*", {cwd: path}).forEach(function (option) {
      key = option.replace(/\.js$/, "");
      obj[key] = require(path + option);
    });

    return obj;

  }

  var config = {
    pkg: grunt.file.readJSON( "package.json" )
  };

  grunt.util._.extend( config, loadOpts( "./tasks/options/" ) );

  // Configure grunt
  grunt.initConfig( config );

  // Load and register all of the `grunt-` tasks from the
  // devDependencies section of the package.json file
  require( "load-grunt-tasks" )( grunt );

  // Load all of *our* tasks (./tasks/)
  grunt.loadTasks( "tasks" );

  // Any shortcut aliased tasks
  grunt.registerTask( "default", "What is our default `grunt` task set?", [ "" ] );

};
