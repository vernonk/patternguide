/* View render layer for now until I can dig into ES6 generators more, I
can knock this out pretty quickly doing it old school */


// views needs to add itself to the `this` context so that it has availability to the generator, and state, and such
// use a plugins ns so it's set up right


(function () {
  "use strict";

  var fs = require( "fs" ),
      _ = require( "lodash" );

  module.exports = {
    opts: {
      base: "patternguide/node/views/"
    },

    request: function ( opts ) {
      // What I want to do:
      //
      // 1. Open the said file and parse for any dependencies
      // 2. Open any found dependences and restart with step 1
      // 3. Once at an end, compile and step back up until finally returning to
      //    starting `name` and then

      // I need a way to pause and let the generator know this is async

      var baseFile;

      // don't like all this syncronous stuff... how do I do this better with generators??
      // need to learn more... :) (see note at top)
      if ( fs.existsSync( this.opts.base + opts.path + ".html" ) ) {

        baseFile = fs.readFileSync( this.opts.base + opts.path + ".html", {
          encoding: "utf8"
        });

        // have the base file, need to utilize the partial helper (tbw - to be written)
        // and do necessary recursion until we end up sending back the final rendered piece
        opts.ctx.body = baseFile;

        return {};

        // need to be able to call `next` from in here... how do we get access???

      } else {
        throw( "Issue with base view passed. Please check path and try again: " +
                this.opts.base + opts.path + ".html" );
      }
    },

    // called by user
    render: function *( opts ) {
      try {
        this._validate( [ "ctx", "type", "path" ], opts );
        this.opts.ctx = opts.ctx;
        yield this.request( opts );
      } catch ( e ) {
        opts.ctx.body = "<h1>Error</h1><p>" + e + "</p>";
      }
    },

    // validates all required options are provided, include better info in the error
    _validate: function ( list, opts ) {
      for ( var i = 0, l = list.length; i < l; i++ ) {
        if ( !opts[ list[ i ] ] ) {
          throw "Plugin::Views | Problem with missing parameter: `" + list[ i ] + "`";
        }
      }
      return true;
    }

  };

})();
