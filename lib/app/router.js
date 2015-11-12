"use strict";

module.exports = Backbone.Router.extend({

  routes: {
    "": "base",
    ":type(/)": "setFilter",
    "*path": "fallthrough"
  },

  base: function () {

  },

  setFilter: function ( type ) {

  },

  fallthrough: function ( path ) {
    var parts = path.split( "/" );
    
  }

});
