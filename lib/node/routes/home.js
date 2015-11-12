/**
* These routes are for the UI pages rendered by PatternGuide
**/
var express = require( "express" ),
    router = express.Router();

    // middleware specific to this router
    // router.use(function timeLog(req, res, next) {
    //   console.log('Time: ', Date.now());
    //   next();
    // })

// /elements
// /modules/
// /elements/name
// /patterns/
// /layouts/
// /wires/layoutname
// /comps/layoutname <- comp generator, see Trello
// /elements/name/any/number/of/routers/out/it/will/go/

// router is defined with /elements and such as a base
// this is the remaining bits that come through
// such as name/id

router.get( "/patternguide", function ( req, res ) {
  res.send( "PatternGuide HomePage, Use this so reverse proxy can send the homepage." );
})

router.post( "/", function ( req, res ) {
  res.sendStatus( 403 );
});

// Finally export our router
module.exports = router;
