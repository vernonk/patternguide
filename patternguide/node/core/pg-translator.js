/**
This provides the translator module for patternguide's documentation syntax.
Each supported token is also added to the translator module as a method.
In the returned translator object, there is an additional `translate` method
that receives a comment string as an argument which it then calls the
necessary translation methods to build the final translation object of a
comment.

Note: You will see *lots* of repeated code below in the translators.
This is because I want to have each translator complete before going
back and refactoring to abstract the creation patterns for
a translator to make adding new translations easy.
**/

"use strict";

var _ = require( "lodash" ),
    marked = require( "marked" ),
    translator = {};

/**
@body

Any content following the @body tag is treated as Markdown and is displayed after the title, meta, description, signature and any API related content in the style guide.
**/
translator.bodyPg = function ( comment, index ) {
  var pattern = /@body[^@]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "body": ';
    // splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
    //   console.log( "filterin?", val );
    //   return ( i === 0 || !val.trim() ) ? false : true;
    // });
    splut = matches[ index ] && matches[ index ] || "";
    objStr += '{';
    objStr += '"markdown": ' + JSON.stringify( splut ) + ',' +
              '"html": ' + JSON.stringify( marked( splut ) );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @body token: " + ( matches[ index ] && matches[ index ] ) );
    obj.body = "Bad syntax found for @body token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};

/**
@compatibility

Provides a summary of browser and/or device support this item in question provides.

parameters    | type   | default      | description
------------- | ------ | ------------ | ----------------------
compatibility | String | `"Untested"` | Text that describes what type of browser and/or device support a user should expect to receive.

example:
@compatibility "Chrome, Firefox, Edge, IE9+, Safari, iOS Safari, Android Browser"
**/
translator.compatibilityPg = function ( comment, index ) {
  var pattern = /@compatibility[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "compatibility": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"support": ' + JSON.stringify( splut[ 0 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @compatibility token: " + ( matches[ index ] && matches[ index ] ) );
    obj.compatibility = "Bad syntax found for @compatibility token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@deprecated

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
version    | String | `""`    | Specifies a deprecation warning for an item based on a particular version.
descripton | String | `""`    | Text that describes the deprecation.

example:
@deprecated "1.4.0" "This feature is deprecated and will be removed in v2.0"
**/
translator.deprecatedPg = function ( comment, index ) {
  var pattern = /@deprecated[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "deprecated": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"version": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( marked( splut[ 1 ] || "" ) );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @deprecated token: " + ( matches[ index ] && matches[ index ] ) );
    obj.deprecated = "Bad syntax found for @deprecated token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@description

Any content following the @description tag is treated as Markdown.

The description should be plain, and easy to read and understand. It should clearly explain the context at hand, giving guidance towards an easier path through the particular piece in question.

@description
The `el` property can be used to define what type of HTML node will be
used as the containing element.

```JavaScript
  //...
  el: "div"
```
**/
translator.descriptionPg = function ( comment, index ) {
  var pattern = /@description[^@]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "description": ';
    splut = matches[ index ] && matches[ index ] || "";
    objStr += '{';
    objStr += '"markdown": ' + JSON.stringify( splut ) + ',' +
              '"html": ' + JSON.stringify( marked( splut ) );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @description token: " + ( matches[ index ] && matches[ index ] ) );
    obj.description = "Bad syntax found for @description token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@experimental

Indicate a feature, or item, as experimental. This can be useful when adding new patterns before launch, or during A/B testing efforts.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
description | String             | `""`     | Text that describes the nature of the experiment.

example:
@experimental "Gathering user response to more contrast in CTA"
**/
translator.experimentalPg = function ( comment, index ) {
  var pattern = /@experimental[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "experimental": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"description": ' + JSON.stringify( splut[ 0 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @experimental token: " + ( matches[ index ] && matches[ index ] ) );
    obj.experimental = "Bad syntax found for @experimental token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};

/**
@iframe

Inserts an iframe into the style guide page.

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
src        | String | `""`    | Adds an iframe to the style guide page.
height     | String | `"2rem"`   | Specifies the height of the included iframe.

example:
@iframe "http://iframeSrcUrlOr.path" "2rem"
**/
translator.iframePg = function ( comment, index ) {
  var pattern = /@iframe[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "iframes": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"src": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"height": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @iframe token: " + ( matches[ index ] && matches[ index ] ) );
    obj.iframes = "Bad syntax found for @iframe token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@inherits

Shows that the currently documented section inherits from something else. This can be different depending upon the context. In JavaScript, this may be another constructor function. In Sass, this may be an extension of another selector or component.

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
name       | String | `""`    | Text that specifies inheritance point.

example:

@inherits "Factory"
**/
translator.inheritsPg = function ( comment, index ) {
  var pattern = /@inherits[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "inherits": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @inherits token: " + ( matches[ index ] && matches[ index ] ) );
    obj.inherits = "Bad syntax found for @inherits token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@link

Adds a link to the "links" section of the page.

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
url        | String | `""`    | URL that link should point to
linkText   | String | `""`    | Text used for display of link

example:
@link "https://www.github.com" "GitHub"
**/
translator.linkPg = function ( comment, index ) {
  var pattern = /@link[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "links": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"url": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"linkText": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @link token: " + ( matches[ index ] && matches[ index ] ) );
    obj.links = "Bad syntax found for @link token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@option

Details the properties of an object in a @param tag.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
name        | String             | `""`     | Specifies the name of the option.
type        | String             | `String` | Specifies the expected type for the option.
description | String | `""`      | Text that describes the option.
default     | __Option Defines__ | `""`     | Specifies the default value of the option.

example(s):
@option "className" "String" "Default CSS class name" "button"
@option "attrs" "Object" "List of attributes for new element"
**/
translator.optionPg = function ( comment, index ) {
  var pattern = /@option[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "options": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"type": ' + JSON.stringify( splut[ 1 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 2 ] || "" ) + ',' +
              '"default": ' + JSON.stringify( splut[ 3 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @option token: " + ( matches[ index ] && matches[ index ] ) );
    obj.options = "Bad syntax found for @option token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@param

Defines an expected parameter. This can be used for Sass mixins, JavaScript functions, as well as View certain template variables. Certain pieces of your view, like default values, may simply use the @option tag to detail the option.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
name        | String             | `""`     | Specifies the name of the parameter.
type        | String             | `""` | Specifies the expected type for the parameter.
description | String | `""`      | Brief text that describes the parameter.
default     | String | `""`     | Can be used to specify simple default values where the @option tag is too much extra.

example(s):
@param "opts" "Object" "Provides any options for instantiation."
@param "channel" "String" "Default message channel to subscribe to" "*"
**/
translator.paramPg = function ( comment, index ) {
  var pattern = /@param[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "params": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"type": ' + JSON.stringify( splut[ 1 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 2 ] || "" ) + ',' +
              '"default": ' + JSON.stringify( splut[ 3 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @param token: " + ( matches[ index ] && matches[ index ] ) );
    obj.params = "Bad syntax found for @param token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@property

Describes the property of an object.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
name        | String             | `""`     | Specifies the name of the option.
type        | String             | `String` | Specifies the expected type for the option.
description | String             | `""`     | Brief description, use @description token for more detailed description.

example(s):
@property "isActive" "Boolean" "Details whether the object is instantiated."
@property "selector"
**/
translator.propertyPg = function ( comment, index ) {
  var pattern = /@property[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "properties": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"type": ' + JSON.stringify( splut[ 1 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 2 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @property token: " + ( matches[ index ] && matches[ index ] ) );
    obj.properties = "Bad syntax found for @property token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@ticket

Reference number or string to ticket tracking software. Adds ability to create references to actual ticketed work in library.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
id          | String             | `""`     | Specifies the ticket id.
url         | String             | `""`     | Specifies a reference URL.
type        | String             | `""`     | Specifies ticketing system (e.g. "Jira")

example:
@ticket "123456" "http://ticketurl.com" "Jira"
**/
translator.ticketPg = function ( comment, index ) {
  var pattern = /@ticket[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "tickets": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"id": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"url": ' + JSON.stringify( splut[ 1 ] || "" ) + ',' +
              '"type": ' + JSON.stringify( splut[ 2 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @ticket token: " + ( matches[ index ] && matches[ index ] ) );
    obj.tickets = "Bad syntax found for @ticket token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
# CSS / Sass Tags

The following tags are specific to your Sass or CSS files.


/**
@mixin

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
name       | String | `""`    | Specifies a Sass mixin. A name should be provided.
description | String | `""`   | Used for simple description, use `@description` token for detailed descriptions.

example:
@mixin "triangle" "Draws a CSS only triangle"
**/
translator.mixinPg = function ( comment, index ) {
  var pattern = /@mixin[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "mixins": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @mixin token: " + ( matches[ index ] && matches[ index ] ) );
    obj.mixins = "Bad syntax found for @mixin token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@modifiers

An array of Objects that contain two properties:

1. **`state`**: The CSS selector for the particular modifier state (e.g. `:hover` or `.review:hover`).
2. **`description`**: Text that describes the particular modifier state

parameters | type   | default | description
---------- | ------ | ------- | ----------------------
modifiers  | Array  | `[]`    | Array that specifies various CSS modifier states.

example:
@modifiers [
  {
    state: ".icon:hover",
    description: "Icon hover state for CTA buttons"
  },
  {
    state: ".icon.selected",
    description: "Icon selected state for CTA buttons"
  }
]
**/
translator.modifiersPg = function ( comment, index ) {
  var pattern = /@modifiers[^\]]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "modifiers": [';
    splut = matches[ index ] && matches[ index ].split( '{' ).map(function ( val, i ) {
      var state = val.match( /state\:[^\n]+/ ),
          description = val.match( /description\:[^\n]+/ );
      // at least a state is required to be considered a modifier
      if ( state ) {
        state = state[ 0 ].replace( /state\:|,|"/g, "" ).trim();
        if ( description ) {
          description = description[ 0 ].replace( /description\:|,|"/g, "" ).trim();
        }
      }
      // returning a string instead of an object to be part of overall objStr
      return '{ "state": ' + ( ( state ) ? '"' + state + '"' : null ) + ', "description": ' + ( ( description ) ? '"' + description + '"' : null ) + ' }';
    });
    objStr += splut.join( "," );
    objStr += '] }';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @modifiers token: " + ( matches[ index ] && matches[ index ] ) );
    obj.modifiers = "Bad syntax found for @modifiers token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};



/**
# JavaScript Tags

The following tags are specific to your JavaScript files.
**/

/**
@argument

Denotes an argument that is passed to a callback function. Use the @description tag to detail the argument. The description parameter is for brief descriptions.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
name        | String             | `""`     | Specifies the name of the argument.
description | String             | `""`     | Describes the argument

example(s):
@argument "event" "The event data object"
@argument "details"
**/
translator.argumentPg = function ( comment, index ) {
  var pattern = /@argument[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "arguments": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @argument token: " + ( matches[ index ] && matches[ index ] ) );
    obj.arguments = "Bad syntax found for @argument token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};



/**
@constructor

Denotes a constructor function.

parameters  | type   | default         | description
----------- | ------ | --------------- | -------------------------------
name        | String | `""` | The name of the Constructor function.
displayName | String | `""`            | Alternate display name for style guide.

example(s):
@constructor "Car"
@constructor "Car" "Car Constructor Function"
**/
translator.constructorPg = function ( comment, index ) {
  var pattern = /@constructor[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "constructors": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"displayName": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @constructor token: " + ( matches[ index ] && matches[ index ] ) );
    obj.constructors = "Bad syntax found for @constructor token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};

/**
@event

Denotes an event that is triggered by the JavaScript component. This event and its details will be added to the events section of the JavaScript portion of the style guide. This assumes DOM based event triggers, but could also be used in a larger dispatcher type environment (like a Flux setup) to detail various actions. Use the `@description` tag to detail other specifics like these.

parameters  | type   | default | description
----------- | ------ | --------| -------------------------------
name        | String | `""` | The event name that users can listen for
selector | String | `""` | Selector describing node where event will be triggered
description | String| `""` | Description of event

example:
@event "beforeopen" "document" "Fires before modal opens"
**/
translator.eventPg = function ( comment, index ) {
  var pattern = /@event[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "events": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"selector": ' + JSON.stringify( splut[ 1 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 2 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @event token: " + ( matches[ index ] && matches[ index ] ) );
    obj.events = "Bad syntax found for @event token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};


/**
@function

Denotes a function or method

parameters  | type   | default         | description
----------- | ------ | --------------- | -------------------------------
name        | String | `""` | The name of the function.
displayName | String | `""`            | Alternate display name for style guide.

example:
@function "Function.name" "Special display name"
**/
translator.functionPg = function ( comment, index ) {
  var pattern = /@function[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "functions": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"name": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"displayName": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @function token: " + ( matches[ index ] && matches[ index ] ) );
    obj.functions = "Bad syntax found for @function token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};

/**
@return

Describes a function's return value.

parameters  | type               | default  | description
----------  | ------------------ | -------- | ----------------------
type        | String             | `String` | Specifies the type of return value.
description | String             | `""`     | Text that describes the return value.

example:
@return "Object" "A new instance of the Car constructor"
**/
translator.returnPg = function ( comment, index ) {
  var pattern = /@return[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "returnValues": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"type": ' + JSON.stringify( splut[ 0 ] || "" ) + ',' +
              '"description": ' + JSON.stringify( splut[ 1 ] || "" );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @return token: " + ( matches[ index ] && matches[ index ] ) );
    obj.returnValues = "Bad syntax found for @return token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};

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
translator.signaturePg = function ( comment, index ) {
  var pattern = /@signature[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {}, splut;
  // make sure we have an actual number to go against
  index = ( typeof index === "number" ) ? index : 0;
  if ( matches ) {
    objStr += '{ "signatures": ';
    splut = matches[ index ] && matches[ index ].split( '"' ).filter(function ( val, i ) {
      return ( i === 0 || !val.trim() ) ? false : true;
    });
    objStr += '{';
    objStr += '"signature": ' + JSON.stringify( splut[ 0 ] ) + ',' +
              '"description": ' + JSON.stringify( splut[ 1 ] );
    objStr += '}';
    objStr += '}';
  }
  try {
    return JSON.parse( objStr );
  } catch ( e ) {
    console.log( "Bad syntax found for @signature token: " + ( matches[ index ] && matches[ index ] ) );
    obj.signatures = "Bad syntax found for @signature token: " + ( matches[ index ] && matches[ index ] );
    return obj;
  }
};

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
translator.authorsPg = function ( comment, index ) {
  var pattern = /@authors[^\n]+/g,
      matches = comment.match( pattern ),
      objStr = '', obj = {};

  if ( matches ) {
    // build our string that we'll convert to an object
    objStr += '{ "authors":';
    // make sure we have an actual number to go against
    index = ( typeof index === "number" ) ? index : 0;
    objStr += matches[ index ] && matches[ index ].replace( /@authors/g, "" ).trim();
    objStr += '}';
    try {
      obj = JSON.parse( objStr );
      // make sure that the array contains unique entries
      obj.authors = _.uniq( obj.authors );
      return obj;
    } catch ( e ) {
      console.log( "Bad syntax found for @authors token: " + ( matches[ index ] && matches[ index ] ) );
      obj.authors = "Bad syntax found for @authors token: " + ( matches[ index ] && matches[ index ] );
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
      tokensFound = comment.match( /@[a-z]+/g ),
      tokensCounted = [];

  // let's store the tokens found & remove ourselves from the dictionary
  dictionary.splice( dictionary.indexOf( "translate" ), 1 );
  if ( tokensFound ) {
    // map out our found tokens array without the "@"
    tokensFound = tokensFound.map(function ( val ) {
      tokensCounted.push( { token: val.replace( "@", "" ), index: _.where( tokensCounted, { token: val.replace( "@", "" ) } ).length } );
      return val.replace( "@", "" );
    });
    // translations may be an array, but it's still just an object. :)
    // store a static tokens property to see all the tokens from this comment
    translations.tokens = tokensFound;
    // iterate through all the tokens, calling the matching translator method
    // where appropriate and then pushing the result into the overall set
    // of returned translations
    tokensCounted.forEach(function ( tokenObj ) {
      translator[ tokenObj.token + "Pg" ] && translations.push( translator[ tokenObj.token + "Pg" ]( comment, tokenObj.index ) );
    });
  }
  // console.log( "Final simple Translations\n============\n", translations );
  return translations;
};

module.exports = translator;
