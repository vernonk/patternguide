# PatternGuide

\*\*\* **Development in Progress** \*\*\*

Responsive Design has completely revolutionized the way that design and development
teams should approach collaboration. The waterfall methodologies of the past simply
can't sustain the needs of modern design and development organizations.

## _Say hello to PatternGuide._

PatternGuide is a workflow tool and style guide generator. The tool is geared to enhance the collaboration efforts between designers and developers, provide a streamlined local development experience, and create a well-structured and maintainable pattern library.


## Pre-Use Dependencies

* Latest io.js or Node.js
* `npm install` (depending on your location/proxy/"situation" you may need sudo)

## Reverse Proxy Debugging & Prototyping

Proxy debugging and development is an extremely powerful piece in your arsenal when you being using it correctly. By reverse proxying assets,
you can decide which files need to be part of your local set and which files can be served from a live server.

When building design systems (which is PatternGuide's purpose) the touching over of **every, single page** is a thing of the past, as we use 
reusable components and modules. This is where the power of a reverse proxy can began to be seen.

You no longer need all of the HTML on your local machine. You can debug production defects using your local JavaScript and Sass/CSS, while all the while
seeing the results as if you were coding against production itself.

## Individual Workflow Tasks

### `gulp localize`

The purpose behind `gulp localize` is to allow you the ability to pull down any asset from the web to work on locally. This enables you to fetch data requests for offline development, full HTML pages for rapid prototyping and debugging, etc.

**How do you run it?**

`gulp localize --asset=github.com/index.html`

You should see a successful output on the command line and then you will find the asset available via the `localized` directory in your repo. You'll notice that there is a folder created for the domain you localized from. This will help you work quickly on any number of sites, and since this isn't committed, do whatever you want!

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
