PatternGuide
---

**Update (May 7, 2016):** I am working on restructuring the overall PatternGuide ecosystem. A single product is way too narrow to try and solve the problem of an end-to-end Design System. To that end, the initial focus will be on the Front-end Development workflow portion (https://github.com/vernonk/patternguide-dev/). This will be a local development environment, geared towards production, staging, model, or development emulation utilizing local resources. This will open up the doors of ES2015 (ES6), Sass, and much more to developers in an "easy to digest" environment. The [PatternGuide documentation syntax](https://github.com/vernonk/patternguide/wiki) will be an active part of this environment as well, feeding the living style guide product from the overall end-to-end UX Design System.

---


Responsive Design has completely revolutionized the way that design and development
teams should approach collaboration. The waterfall methodologies of the past simply
can't sustain the needs of modern design and development organizations.

## _Say hello to PatternGuide._

PatternGuide is a workflow tool and style guide generator. The tool is geared to enhance the collaboration efforts between designers and developers, provide a streamlined local development experience, and create a well-structured and maintainable pattern library.

**[PatternGuide Documentation Syntax](https://github.com/vernonk/patternguide/wiki)**

## Sections

* [Pre-use Dependencies](#pre-use-dependencies)
* [Development In-Progress](#development-in-progress)
* [Pattern Library Deconstruction](#pattern-library-deconstruction)
* [Reverse Proxy Debugging & Prototyping](#reverse-proxy-debugging--prototyping)
* [Individual Workflow Tasks](#individual-workflow-tasks)

## Pre-Install

* Built against node.js v4.2.2
* `npm install` (depending on your location/proxy/"situation" you may need sudo)

## Development In-Progress

PatternGuide is in active development. I'm hoping to have v1 complete by <strike>June 15, 2015</strike> (obviously missed that one - thanks paycheck :-) - hoping to wrap v1 asap).

## Pattern Library Deconstruction

PatternGuide gives you the ability to generate a living style guide and reusable component library. These components can
be used to create reusable layouts, and those layouts used to create fully built HTML pages. This work has been heavily
influenced by the tremendous work done by [Brad Frost](http://bradfrost.com/) on [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)
and [PatternLab.io](http://patternlab.io/) along with [Dave Molsen](http://www.dmolsen.com/).

### But how?

Understanding how everything comes together can take some time, but understanding **how to use the tool** should be mostly
painless and hopefully will introduce new gains in efficiency which result in more time for you to focus on moving the web,
your team, yourself, and your organization forward. Let's take some time to look at the individual parts and responsibilities.

### The Building Blocks

1. Elements
1. Modules
1. Patterns
1. Layouts
1. Pages

You may be asking, _"What about the content?"_ Don't worry. It's in there, just spread between all of the various pieces.
As the final pages come together, the various bits of structured and strategically sound content will be ready, not only
for the page it is on but for sharing across other pages as well.

#### Elements

Elements are the core, fundamental part that everything originates from. When we speak of elements, we're talking about
colors, fonts, form standards, etc. These elemental rules and definitions will be used to construct our modules.

* Source Location: `src/elements`

#### Modules

Modules are the "thing" - or "widget" - that elements combine to create. A simple example of a module may be a search form.
In a search form, you'll have the text input, your form button, perhaps an icon. Multiple elements that come together to create
our module.

* Source Location: `src/modules`

#### Patterns

Patterns are defined when we take a collection of modules to form something. Using the search module from our example above,
let's say with our search module, we also have a navigation module, and a social module. We can take that shared, similar grouping
of modules and bring them together to create a pattern. Both modules and patterns can be used in our reusable layouts.

* Source Location: `src/patterns`

#### Layouts

Layouts are reusuable collections of patterns and modules that form an overall page layout. These reusable page layouts
will determine what types of editable content sections will be available for content strategists, your clients, or you to
use to manage the bits of content on the fully built HTML pages.

* Source Location: `src/layouts`

#### Pages

Pages are the culmination of all the pieces beforehand. Pages are the rendered HTML of the collection of
various elements, modules, patterns, layouts and content structures.

* Source Location: `src/pages`


### Other articles

Here are a couple articles on design systems:

* [What a design system looks like](https://medium.com/@vernonk/what-a-design-system-looks-like-88fdc7e66e7a)
* [Design Systems are Coming to the Enterprise. Are Your UX Teams Ready?](https://medium.com/@vernonk/design-systems-are-coming-to-the-enterprise-are-your-ux-teams-ready-1d7343e212c3)

## Starting the Style Guide

To start the style guide tool (will also kick off the proxy debugger if a flag is passed - info below), run the following command from the root of your repository on the command line:

```text
./bin/patternguide
```

This will kick off the server and open your default browser to the style guide homepage.

## Working with Style Guide views

You can modify the node generated views of the style guide by modifying the ejs files located at `./patternguide/node/views`.

## Styling the Style Guide

You can apply your own styling to the style guide by modifying the Sass files located in `./patternguide/styles`. In that directory, there are various files around layouts, modules, etc.

## Working with the Style Guide client-side application layer

The JavaScript application for the client-side is stored in `./patternguide/app`. This is where all the necessary application pieces for models, views, etc will be stored for the style guide.



---

## Reverse Proxy Debugging & Prototyping

Proxy debugging and development is an extremely powerful piece in your arsenal. By reverse proxying assets,
you can decide which files need to be part of your local set and which files can be served from a live server.

When building design systems (which is PatternGuide's purpose) the touching over of **every, single page** is a thing of the past, as we use
reusable components and modules. This is where the power of a reverse proxy can start to be seen in the life of a Front-End Developer & Designer.

You no longer need all of the HTML on your local machine. You can denbug production defects using your local JavaScript and Sass/CSS, while all the while
seeing the results as if you were coding against production itself.

### Kicking off the reverse proxy server

Getting the reverse proxy up and running is a really easy task. Fire up your terminal and `cd` to the root of your
`patternguide` repo. From there, the syntax for kicking off the server looks like this:

```
./bin/patternguide --ph=domain.com
```

The `ph` option flag defines which host to use as the reverse proxy. This will fire up the Express server as well as
the BrowserSync server and open a tab in your default browser.

From that point, it's watching your `src` directory for changes to `.scss` or `.js` files out of the box.

### Configuring watched files

It's very easy to configure what files are being watched by modifying the Gulp task located at
`./gulp/patternguide/tasks/watchers.js`. The definition should be fairly clear if you've used Gulp before.

### Directory Order of Priority

PatternGuide will serve assets based on a defined directory stack. If an asset is found at the requested path, it is returned
and served. If not, the next directory in the stack is checked, and so on and so forth. If the asset is not found, you get a 404.

The order of priority for PatternGuide serves from the following directories:

1. `./localized`
1. `./dist`
1. `./src`
1. `./sandbox`

**As v1 of PatternGuide is completed over the next few weeks the other routes accessible will be related to the living style guide.
Each route will be namespaced to `patternguide` to avoid URL conflicts in reverse proxying.**

### Pathing files and such

The directory order described above will all be served from the application as if that directory were root. So if you're working
on a local prototype in your `sandbox` directory and its directory name is `myprototype`, then you would access the URL
via the local server at http://localhost:3001/myprototype.

### How serving `localized` files works

The documentation for the `localized` task is below in the **Individual Workflow Tasks** section, but in-short the task allows you to fetch most HTML, CSS, JavaScript, JSON, XML resources from the web
and pull down to your local environment. At that point, a directory is created with the domain the resource was fetched from
in your `localized` directory as well as the resource at the path it would normally live at. The reverse proxy will serve
assets from your localized directory based on a matching domain passed with the `--ph` option flag.

### Collaborating In-Network

The BrowserSync server will fire off a tab in your default browser and you will notice that it has an IP. If you're on a
local network, you can share that out and other folks can view your screen. You can also give them control, follow history, etc.
Those features can all be seen [over on the BrowserSync site](http://www.browsersync.io/).

## Individual Workflow Tasks

### `gulp localize`

The purpose behind `gulp localize` is to allow you the ability to pull down most HTML, CSS, JavaScript, JSON, XML resources from the web to work on locally. This enables you to fetch data requests for offline development, full HTML pages for rapid prototyping and debugging, etc. Work will continue to support a wide array of rendered HTML sources rather than just raw extensions.

**How do you run it?**

`gulp localize --asset=github.com/index.html`

You should see a successful output on the command line and then you will find the asset available via the `localized` directory in your repo. You'll notice that there is a folder created for the domain you localized from. This will help you work quickly on any number of sites, and since this isn't committed, do whatever you want!

### `gulp clean`

You can use `gulp clean` to completely empty one or all of the following: `./dist`, `./localized`, and `./sandbox`. When you run
the command you will be given a prompt in the command line where you can select which paths you want to clean.

## API Definition

PatternGuide is being developed with the idea that the tool could be set up and
used as a standlone API to build other collaborative tools (e.g. a rapid prototyping tool that consumes the patterns from PatternGuide).

The overall goal is to keep the API as simple as possible to make working with it as easy as possible. The service will utilize HTTP verbs to determine necessary methods, keeping the API calls very short and memorable.

* /element/name
* /module/name
* /pattern/name
* /layout/name
