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

/**
* @syntax | String
*   - Possible values: "js", "css", "sass", "scss", "less", "stylus", "html"
* @str | String | text to parse
* @filepath | String | Source path, can be helpful with errors not required.
*
* Parsers:
* To parse different document syntaxes, we use various parsers:
*   * Esprima for parsing JavaScript-type files
*   * CSS - Simple regex based for now while determining best way to parse
*           various preprocessor formats.
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

// parse js for patternguide style comments
function jsParser ( str, filepath ) {
  var comments = esprima.tokenize( str, { comment: true } ).comments;
  comments.forEach(function ( comment, i ) {
    comments[ i ] = translator.translate( comment.value );
  });
  return comments;
}

// parse css for patternguide style comments
// simple for now that just parses general css style comments with a regex
// was using the `css` module but want to be agnostic on filetype as much as possible
// and base off of expected syntax in terms of comment styles to accept
function cssParser ( str, filepath ) {
  var cssRegex = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, // http://www.w3.org/TR/CSS21/grammar.html
      theComments = str.match( cssRegex );
  if ( theComments ) {
    theComments.forEach(function ( comment, i ) {
      theComments[ i ] = translator.translate( comment );
    });
    return { err: null, data: { comments: theComments } };
  } else {
    return { err: null, data: { comments: null } };
  }
}

// parse html for patternguide style comments
function htmlParser ( str, filepath ) {
  var comments = [],
      parse5Parser = new parse5.SimpleApiParser({
        comment: function ( str ) {
          comments.push( translator.translate( str ) );
        }
      });
  // send our view through the parser
  parse5Parser.parse( str );
  return { err: null, data: { comments: comments } };
}

parser.get = function ( syntax, filepath ) {
  // this request will give us a clean filepath and the syntax so we know what to parse
  return parser.parse( syntax, fs.readFileSync( path.join( __dirname, "../../../src", filepath ), { encoding: "utf8" } ), path.join( __dirname, "../../../src", filepath ) );
};

module.exports = parser;
