"use strict";

var ioOutput = {};

// isMetaOutput is used to define whether or not an output from a child process
// is meta information that we want included.
ioOutput.isMetaOutput ( output ) {
  output = ( output ) ? output.toTring() : "";
  // any strings defined in the metapatterns use .indexOf, regex use test
  var metaPatterns = [
        "Starting",
        "Finished",
        "Using gulpfile"
      ],
      i, l;
  for ( i = 0, l = gulpMetaPatterns.length; i < l; i++ ) {
    if ( typeof gulpMetaPatterns[ i ] === "string" ) {
      if ( output.indexOf( gulpMetaPatterns[ i ] ) !== -1 ) {
        return true;
      }
    } else if ( gulpMetaPatterns[ i ].test( output ) ) {
      return true;
    }
  }
};

module.exports = ioOutput;
