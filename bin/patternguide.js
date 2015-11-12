#!/usr/bin/env node --harmony
/*
When I run patternguide what happens out of the box? No flags.

 - Style guide server started, No Development Workflow
 - View only mode, Intended for standlone viewing & sharing.

Additional states:

  --develop
    Enables the full development workflow: Reverse Proxy (using default
    from configuration or provided flag), Watcher

  --design
    Enable designer tools

  --build
    Enable build of pattern library style guide to static html (and others)
    Could be "export" with --export-type and --export-path flags.

Options:

  --proxyhost
    Determines what host the reverse proxy should reference

  --port
    Change the default port

  --verbose
    Enable verbose mode

  --browsersync
    Enable browsersync server

  --livereload
    Enable livereload server
*/
var fs = require( "fs" ),
    path = require( "path" ),
    gulp = require( "gulp" ),
    yargv = require( "yargs" ),
    spawn = require( "child_process" ).spawn,
    chalk = require( "chalk" ),
    app = require( path.join( __dirname, "..", "../lib/node/app" ) ),
    handleIo = require( "./lib/node/utils/io-output.js" ),
    server, children = {},
    options = {
      "b": {
        alias: "build",
        describe: "Build a static version of the style guide.",
        nargs: 1
      },
      "bs": {
        alias: "browsersync",
        describe: "Enable BrowserSync server",
        type: "boolean"
      },
      "lr": {
        alias: "livereload",
        describe: "Enable LiveReload server",
        type: "boolean"
      },
      "m": {
        alias: "minify",
        describe: "Perform an initial minification task on startup.",
        nargs: 1
      },
      "p": {
        alias: "port",
        describe: "Start the server on this port.",
        nargs: 1,
        default: '3000',
        type: 'string'
      },
      "ph": {
        alias: "proxyhost",
        describe: "Host to use as reverse proxy, overrides PatternGuide config",
        nargs: 1,
        type: "string"
      },
      "v": {
        alias: "verbose",
        describe: "Verbose mode",
        nargs: 1
      }
    };

// pass in our options and get the arguments object back.
yargv = yargv.usage( "Usage: patternguide" ).options( options ).argv;

if ( yargv.verbose ) patternguide.set( "config" ).verbose = true;
if ( yargv.proxyhost ) patternguide.set( "config" ).proxyhost = yargv.proxyhost;

patternguide.set( "config" ).cliargs = yargv;

function spawnChild ( opts ) {
  let isVerbose = patternguide.get( "config" ).verbose;
  // this is going to be small util module that is included
  // what is opts?
  /*
    opts.
          name => property name (e.g. children.watchers)
          command => child_process prop
          args => child_process prop
  */
  children[ opts.name ] = spawn( opts.command, opts.args );
  children[ opts.name ].stdout.on( "data", function ( data ) {
    data = data.toString();
    var modifiedFile, modifiedFileType;
    if ( isVerbose ) {
      console.log( chalk.green( "OK:" ), data );
    } else if ( !handleIo.isMetaOutput( data ) ) {
        console.log( chalk.green( "OK:" ), data );
      }
    }
  });
}


//////// deleted lines are below here... removing as I go.



// patternguide cli options

// set up our cli
cli.main(function ( args, opts ) {

  if ( !opts.dumb ) {
    children.watchers = spawn( "gulp", [ "watchers" ] );
    children.watchers.stdout.on( "data", function ( data ) {
      data = data.toString();
      var modifiedFile, modifiedFileType;
      if ( opts.verbose ) {
        cli.ok( data );
      } else {
        if ( !handleIo.isMetaOutput( data ) ) {
          cli.ok( data );
        }
      }
      // need to reload browsersync from in here
      // just reload the filetype that was being watched
      // going to match the filename in a watch changed message
      // also matches "gulpfile.js" message but
      // that should be ignored by the "ignored" set when not in verbose
      modifiedFile = data.match( /([^\/]+)\.(\w+)/ );
      modifiedFileType = ( modifiedFile ) ? modifiedFile[ 0 ].substr( modifiedFile[ 0 ].lastIndexOf( "." ) ) : "";

      if ( modifiedFile && modifiedFile[ 0 ] !== "gulpfile.js" ) {
        console.log( "BrowserSync should be reloading all " + modifiedFileType + " files." );
        bs.reload( "**/*." + modifiedFileType );
      }

    });
    children.watchers.stderr.on( "data", function ( data ) {
      console.log( "ERROR!", data );
    });
    children.watchers.on( "close", function ( data ) {
      console.log( "CLOSE!", data );
    });

  }

  ///////////////////////////////////////////////////////////////////////////
  // fn to get browser-sync server running, using created express server as its proxy
  ///////////////////////////////////////////////////////////////////////////
  function browserSync () {
    /*
    * since the files are proxying through the proxy the script for bs
    * doesn't get injected into proxied HTML. Need to intercept
    * the HTML and store it in a TEMP file in the same dir, then serve???
    * How can I get the script tag injected?
    */
    bs.init({
      files: [
        "dist/**/**/*.{html,js,css}",
        "localized/**/**/*.{html,js,css}",
        "sandbox/**/**/*.{html,js,css}",
        "patternguide/**/**/*.{html,js,scss,css,svg,png}"
      ],
      browser: [],
      proxy: "http://localhost:" + opts.port,
      port: opts.port + 1,
      open: "external" // opens network-shareable URL automatically
    }, function ( err, bs ) {
      if ( err ) {
        cli.warn( "Error starting BrowserSync server. Check application." );
      } else {
        cli.ok( "Front-End Development Workflow via BrowserSync ready at ".green +
                      "http://localhost:" + ( opts.port + 1 ) );
      }
    });
  };

  // start up our main Express server and then kick in the BrowserSync server
  server = app.listen( opts.port, function () {
    var host = ( server.address().address === "::" ) ? "localhost" : server.address().address,
        port = server.address().port;

    cli.ok( "PatternGuide running at http://" + host + ":" + port + "\n" );

    // kick off the BrowserSync server
    browserSync();
  });

  // add some proper process watching for the overall application
  process.on( "SIGINT", function () {
    console.log( "SIGINT!" );
    children.watchers.kill();
    process.exit();
  });
  process.on( "SIGQUIT", function () {
    console.log( "SIGQUIT!" );
    children.watchers.kill();
    process.exit();
  });
  process.on( "SIGTERM", function () {
    console.log( "SIGTERM!" );
    children.watchers.kill();
    process.exit();
  });

});
