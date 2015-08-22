/**
This provides the translator module for patternguide's documentation syntax.
Each supported token is also added to the translator module as a method.
In the returned translator object, there is an additional `translate` method
that receives a comment string as an argument which it then calls the
necessary translation methods to build the final translation object of a
comment.
**/

"use strict";

var _ = require( "lodash" ),
    translator = {};

/**
@body

Any content following the @body tag is treated as Markdown and is displayed after the title, meta, description, signature and any API related content in the style guide.
**/

/**
@compatibility

Provides a summary of browser and/or device support this item in question provides.

parameters    | type   | default      | description
------------- | ------ | ------------ | ----------------------
compatibility | String | `"Untested"` | Text that describes what type of browser and/or device support a user should expect to receive.
**/

/**
@deprecated

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
version    | String | `""`    | Specifies a deprecation warning for an item based on a particular version.
descripton | String | `""`    | Text that describes the deprecation.
**/

/**
@description

Any content following the @description tag is treated as Markdown and is displayed immediately after the title and meta information of the item.

The description should be plain, and easy to read and understand. It should clearly explain the context at hand, giving guidance towards an easier path through the particular piece in question.
**/

/**
@experimental

Indicate a feature, or item, as experimental. This can be useful when adding new patterns before launch, or during A/B testing efforts.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
description | String             | `""`     | Text that describes the nature of the experiment.
**/

/**
@iframe

Inserts an iframe into the style guide page.

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
src        | String | `""`    | Adds an iframe to the style guide page.
height     | Number | `300`   | Specifies the height of the included iframe.
**/

/**
@inherits

Shows that the currently documented section inherits from something else. This can be different depending upon the context. In JavaScript, this may be another constructor function. In Sass, this may be an extension of another selector or component.

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
name       | String | `""`    | Text that specifies inheritance point.
**/

/**
@link

Adds a link to the "links" section of the page.

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
url        | String | `""`    | URL that link should point to
linkText   | String | `""`    | Text used for display of link
**/

/**
@option

Details the properties of an object in a @param tag.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
type        | String             | `String` | Specifies the expected type for the option.
name        | String             | `""`     | Specifies the name of the option.
default     | __Option Defines__ | `""`     | Specifies the default value of the option.
description | String | `""`      | Text that describes the option.
**/

/**
@param

Defines an expected parameter. This can be used for Sass mixins, JavaScript functions, as well as View certain template variables. Certain pieces of your view may simply use the @option tag to detail the option.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
type        | String             | `String` | Specifies the expected type for the parameter.
name        | String             | `""`     | Specifies the name of the parameter.
default     | __Option Defines__ | `""`     | Specifies the default value of the parameter.
description | String | `""`      | Text that describes the parameter.
**/

/**
@property

Describes the property of an object.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
name        | String             | `""`     | Specifies the name of the option.
type        | String             | `String` | Specifies the expected type for the option.
displayName | String             | `""`     | Text to use as display text.
**/

/**
@ticket

Reference number or string to ticket tracking software. Adds ability to create references to actual ticketed work in library.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
id          | String             | `""`     | Specifies the ticket id.
url         | String             | `""`     | Specifies a reference URL.
type        | String             | `""`     | Specifies ticketing system (e.g. "Jira")

# CSS / Sass Tags

The following tags are specific to your Sass or CSS files.
**/

/**
@mixin

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
name       | String | `""`    | Specifies a Sass mixin. A name should be provided.
**/

/**
@modifiers

An array of Objects that contain two properties:

1. **`state`**: The CSS selector for the particular modifier state (e.g. `:hover` or `.review:hover`).
2. **`description`**: Text that describes the particular modifier state

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
modifiers  | Array  | `[]`    | Array that specifies various CSS modifier states.

# JavaScript Tags

The following tags are specific to your JavaScript files.
**/

/**
@argument

Denotes an argument that is passed to a callback function. Use the @description tag to detail the argument.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
name        | String             | `""`     | Specifies the name of the argument.
**/

/**
@constructor

Denotes a constructor function.

parameters  | type   | default         | description
----------- | ------ | --------------- | -------------------------------
name        | String | `Function.name` | The `name` parameter should be supplied if the function name cannot be determined normally.
displayName | String | `""`            | Alternate display name for style guide.
**/

/**
@event

Denotes an event that is triggered by the JavaScript component. This event and its details will be added to the events section of the JavaScript portion of the style guide. This assumes DOM based event triggers, but could also be used in a larger dispatcher type environment (like a Flux setup) to detail various actions. Use the `@description` tag to detail other specifics like these.

parameters  | type   | default | description
----------- | ------ | --------| -------------------------------
name        | String | `""` | The event name that users can listen for
selector | String | `""` | Selector describing node where event will be triggered
**/

/**
@function

Denotes a function or method

parameters  | type   | default         | description
----------- | ------ | --------------- | -------------------------------
name        | String | `Function.name` | The `name` parameter should be supplied if the function name cannot be determined normally.
displayName | String | `""`            | Alternate display name for style guide.
**/

/**
@return

Describes a function's return value.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
type        | String             | `String` | Specifies the type of return value.
description | String             | `""`     | Text that describes the return value.
**/

/**
@signature

Describes a signature for a function. There can be multiple signatures per function. If there are multiple signatures, please consider providing the optional `description` string.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
signature   | String             | `""`     | Example string of how a function should be invoked.
description | String             | `""`     | Text that describes the behavior of the signature.

example:
@signature "new Car( opts )" "Creates a new instance of a car."
**/
translator.signature = function ( comment ) {
  var pattern = /@signature[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {};

  if ( matches ) {
    objStr += '{ "signatures": [ '
    matches.forEach(function ( val, i ) {
      var splut = val.split( '"' );
      // splut[0] = @signature
      // splut[1] = _signature_
      // splut[2] = _description_
      objStr += '{';
      objStr += '"signature": ' + JSON.stringify( splut[ 1 ] ) + ',' +
                '"description": ' + JSON.stringify( splut[ 2 ] );
      objStr += '}';
    });
    objStr += '] }';
    try {
      return JSON.parse( objStr );
    } catch ( e ) {
      console.log( "Bad syntax found for @signature token: " + ( ( matches.length > 1 ) ? "Multiple Matches Found" : matches[ 0 ] ) );
      obj.signatures = "Bad syntax found for @signature token: " + ( ( matches.length > 1 ) ? "Multiple Matches Found" : matches[ 0 ] );
      return obj;
    }
  }
}

/**
@authors

Promotes who authored and has worked on an item.

parameters | type  | default | description
---------- | ----- | ------- | ----------------------
authors    | Array | `[]`    | Array of author names.

authors is a root meta node of a section, it should not be considered
a child node of any other node

example:
@authors [ "Vernon Kesner" ]
**/
translator.authors = function ( comment ) {
  var pattern = /@authors[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {};

  if ( matches ) {
    // build our string that we'll convert to an object
    objStr += '{ "authors": ';
    if ( matches.length > 1 ) {
      // multiple author tokens found, get a single array of authors
      objStr += '[';
      matches.forEach(function ( val, i ) {
        objStr += ( i ? "," : "" ) + val.replace( /@authors|\[|\]/g, "" );
      });
      objStr += ']';
    } else {
      objStr += matches[ 0 ].replace( /@authors/g, "" );
    }
    objStr += '}';
    try {
      obj = JSON.parse( objStr );
      // make sure that the array contains unique entries
      obj.authors = _.uniq( obj.authors );
      return obj;
    } catch ( e ) {
      console.log( "Bad syntax found for @authors token: " + ( ( matches.length > 1 ) ? "Multiple Matches Found" : matches[ 0 ] ) );
      obj.authors = "Bad syntax found for @authors token: " + ( ( matches.length > 1 ) ? "Multiple Matches Found" : matches[ 0 ] );
      return obj;
    }
  }
}

/**
* Provide a single interface to pass a comment to in order to have it translated
* via the PatternGuide set of dictionary methods.
**/
translator.translate = function ( comment ) {
  var dictionary = Object.keys( translator ),
      translations = [],
      tokensFound = comment.match( /@[a-z]+/g );

  // let's store the tokens found & remove ourselves from the dictionary
  dictionary.splice( dictionary.indexOf( "translate" ), 1 );
  if ( tokensFound ) {
    tokensFound = tokensFound.map(function ( val ) {
      return val.replace( "@", "" );
    });
    // translations may be an array, but it's still just an object. :)
    // store a static tokens property to see all the tokens from this comment
    translations.tokens = tokensFound;
    // iterate through all the tokens, calling the matching translator method
    // where appropriate and then pushing the result into the overall set
    // of returned translations
    tokensFound.forEach(function ( token ) {
      translator[ token ] && translations.push( translator[ token ]( comment ) );
    });
  }
  console.log( "Final simple Translations\n============\n", translations );
  return translations;
};


module.exports = translator;
