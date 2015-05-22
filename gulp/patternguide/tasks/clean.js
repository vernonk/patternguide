/**
* Clean task to make cleaning out various dirs easy, run with:
* gulp clean (provides all options on cli)
* gulp clean [ --dist, --localized, --sandbox ] option flags preselect dirs for cleaning
**/
var gulp = require( "gulp" ),
    del = require( "del" ),
    inquirer = require( "inquirer" );

require( "colors" ); // no need to store in variable, since we just reference color props

module.exports = gulp.task( "clean", [], function ( cb ) {
  var argv = require( "yargs" ).argv,
      rooms = [
        {
          name: "dist/**/*",
          checked: false
        },
        {
          name: "localized/**/*",
          checked: false
        },
        {
          name: "sandbox/**/*",
          checked: false
        }
      ],
      dirtyrooms = [],
      promptSchema = [];

  // get any arguments passed
  argv.dist && dirtyrooms.push( "dist/**/*" );
  argv.localized && dirtyrooms.push( "localized/**/*" );
  argv.sandbox && dirtyrooms.push( "sandbox/**/*" );

  // now let's doublecheck and confirm we want to clean these things
  promptSchema.push({
    type: "checkbox",
    name: "dirtyrooms",
    message: "Select any paths you *want* to clean.",
    choices: function () {
      rooms.forEach(function ( val, i ) {
        if ( dirtyrooms.indexOf( val.name ) !== -1 ) {
          rooms[ i ].checked = true;
        }
      });
      return rooms;
    }
  });

  inquirer.prompt( promptSchema, function ( answers ) {
    // go ahead and delete what's left
    console.log( "Cleaning chosen paths.".green, answers.dirtyrooms );
    del( answers.dirtyrooms, cb );
  });

});
