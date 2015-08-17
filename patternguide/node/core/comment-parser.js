/**
* This provides the interface necessary to parse Template partials, CSS/Sass files,
* JavaScript files, and Markdown documentation for PatternGuide syntax and treatment.
**/

"use strict";

var fs = require( "fs" ),
    path = require( "path" ),
    esprima = require( "esprima" ), // to parse JS
    parse5 = require( "parse5" ), // parsing html docs/fragments
		hanson = require( "hanson" ),
		marked = require( "marked" ),
    translator = require( "./pg-translator" ),
    parser = {};

// @something single line comment
// @something[
//  { a: "something", b: 'else' }
// ]

/*
* @something valuevalue
* @something valuevalue
* @something valuevalue
* @something valuevalue
*/

/**
* @syntax | String
*   - Possible values: "js", "css", "sass", "scss", "less", "stylus", "html"
* @str | String | text to parse
* @filepath | String | Source path, can be helpful with errors not required.
*
* Parsers:
* To parse different document syntaxes, we use various parsers:
*   * Esprima for parsing JavaScript-type files
*   * CSS (reworkcss) for parsing CSS-type files
*   * parse5 for parsing HTML documents and fragments
*/
parser.parse = function ( syntax, str, filepath ) {
  var syntaxes = [ "js", "css", "sass", "scss", "less", "stylus", "html" ],
      parsers = {
        js: jsParser.bind( this ),
        css: cssParser.bind( this ),
        html: htmlParser.bind( this ),
      };

      // make the preprocessors just use the css parser
      parser.sass = parser.css;
      parser.scss = parser.css;
      parser.less = parser.css;
      parser.stylus = parser.css;

  if ( syntaxes.indexOf( syntax ) !== -1 ) {
    // TODO: Move *all* methods to this common { err, data } return obj style where possible
    return { err: null, data: parsers[ syntax ]( str, filepath ) };
  } else {
    return { err: syntax + " is not a currently supported documentation syntax. Please open a GitHub issue if you'd like it added." };
  }
};

// take a string and return either false if no patternguide style syntax is found
// or return a common object containing a something object or array that c
parser.findPgSyntax = function ( str ) {

};

// parse js for patternguide style comments
function jsParser ( str, filepath ) {
  var comments = esprima.tokenize( str, { comment: true } ).comments;
  return comments.comments;
}

// parse css for patternguide style comments
// simple for now that just parses general css style comments with a regex
// was using the `css` module but want to be agnostic on filetype as much as possible
// and base off of expected syntax in terms of comment styles to accept
// TODO: blow this out a bit to allow for preprocessor style single line comments as well
function cssParser ( str, filepath ) {
  var cssRegex = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, // http://www.w3.org/TR/CSS21/grammar.html
      theComments = str.match( cssRegex );
  return theComments;
}

// parse html for patternguide style comments
function htmlParser ( str, filepath ) {
}

// From dir-parsers where we get the view and render it
// Need to know what parser to use to parse the view for style guide comments
// Can we use the templatingFileExt from the patterguide.get( "config" ) to determine
// if it should use the htmlParser or jsParser?
// Can we just run it through the htmlParser and get an error back? If so, then just toss it in the
// js parser?
// view: function ( cb ) {
//   var fp = path.join(pathFromRoot, "view", item + "." + patternguide.get("config").templatingFileExt),
//       helpers = require( "../utils/view-helpers" );
//   fs.readFile(fp, {encoding: "utf8"}, function (err, data) {
//     response.err = err;
//     response.view = {
//       src: data,
//       rendered: helpers.render( "#PGSG-" + fp )
//     };
//     cb(err, data);
//   });
// }

parser.get = function ( syntax, filepath ) {
  // this request will give us a clean filepath and the syntax so we know what to parse
  return parser.parse( syntax, fs.readFileSync( path.join( __dirname, "../../../src", filepath ), { encoding: "utf8" } ), path.join( __dirname, "../../../src", filepath ) );
};

module.exports = parser;
