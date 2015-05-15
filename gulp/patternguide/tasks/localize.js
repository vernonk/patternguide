
var gulp = require( "gulp" ),
    fs = require( "fs-extra" ),
    path = require( "path" ),
    colors = require( "colors" ),
    request = require( "request" ),
    fakeUa = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36";

module.exports = gulp.task( "localize", function ( cb ) {
  var argv = require( "yargs" ).argv,
      protocol = ( argv.insecure ) ? "http://" : "https://",
      asset = argv.asset;

  // asset flag required, e.g. --asset=domain.com/path/to/asset.html
  if ( !asset ) {
    cb( "You must pass an --asset flag to the path of the asset. e.g.= --asset=domain.com/path/to/asset.html".red );
    return;
  }

  // request the asset and create our localized asset
  request.get({
    url: protocol + asset,
    timeout: ( argv.timeout ) ? argv.timeout : 5000,
    headers: {
      "User-Agent": ( argv.useragent ) ? argv.useragent : fakeUa
    }
  }, function ( err, res, content ) {
    var domain = "vernon",
        localPath = path.join( __dirname, "..", "..", "..", "localized", asset );

    if ( err ) {
      console.log( "Error in localize asset request:".red + err );
    }

    fs.outputFile( localPath, content, function ( err ) {
      if ( err ) {
        console.log( "Error in writing localized file:".red + err );
      }
      else {
        console.log( "Localized asset:".yellow );
      }
    });
  });
});
