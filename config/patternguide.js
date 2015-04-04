// Pattern Guide Configuration
// CLI Overrides should be available for most of these options outside of probably routePrefix... possibly even that.
module.exports = {

  // PatternGuide supports proxy debugging giving you a seamless local environment
  proxyHost: "", // base host to reverse proxy against, default ''
  proxySecure: true, // route proxy requests through https, default true


  // should routes be sent from somewhere other than patternguide/?
  // this is useful if your site directories conflict with
  // patternguide (e.g. layouts, patterns, etc )
  routePrefix: "", // default 'patternguide' <- allows for reverseproxy to serve homepage

  // what templating engine will be used for partials and layouts?
  // e.g. lodash, underscore, handlebars, hogan, ejs
  // all template engines supported by consolidate.js are supported in patternguide
  // https://github.com/tj/consolidate.js#supported-template-engines
  templating: "lodash", // default 'lodash'
  // cache partials or layouts? Not sure why you would but hey...
  templateCache: false, // default false

};
