/** kickoff of koa app **/
var koa = require( "koa" ),
    staticServer = require( "koa-static"),
    views = require( "koa-views" ),
    app = koa(),
    apiRouter = require( "./api-router" ),
    pageRouter = require( "./page-router" );

app.name = "patternguide";

//strange pathing for views, working offline, debug more at some point in the future
// ordering of statically served files is specific
// localized files come *after* dist because we want them served *first*
// think about the upstream/downstream path of koa
app.use( views( "../node/views", { map: { html: "lodash" } } ) )
  .use( staticServer( "./dist", { defer: true } ) )
  .use( staticServer( "./localized", { defer: true } ) )
  .use(apiRouter.routes())
  .use(pageRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(pageRouter.allowedMethods());

module.exports = app;
