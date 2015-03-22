# PatternGuide

\*\*\* **Development in Progress** \*\*\*

Responsive Design has completely revolutionized the way that design and development
teams should approach collaboration. The waterfall methodologies of the past simply
can't sustain the needs of modern design and development organizations.

## _Say hello to PatternGuide._

PatternGuide is a workflow tool and style guide generator. The tool is geared to enhance the collaboration efforts between designers and developers, provide a streamlined local development experience, and create a well-structured and maintainable pattern library.


## Pre-Use Dependencies

* Latest io.js or Node.js run in `--harmony` mode
* `npm install -g grunt-cli` (hopefully not, but depending on your setup, you may need to run with `sudo`)

## API Definition

PatternGuide is being developed with the idea that the tool could be set up and
used as a standlone API to build other collaborative tools (e.g. a rapid prototyping tool that consumes the patterns from PatternGuide).

The overall goal is to keep the API as simple as possible to make working with it as easy as possible. The service will utilize HTTP verbs to determine necessary methods, keeping the API calls very short and memorable.

* /element/name
* /module/name
* /pattern/name
* /layout/name


## Configuring PatternGuide

### Browserify Modules

**Shimming non-Browserify modules (e.g. jQuery):**

Use the `./config/browserify-shim.js` configuration file to provide any libraries that need to be shimmed and these will be included as dependencies require them.
