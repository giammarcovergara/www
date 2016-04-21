var AppRouter = Backbone.Router.extend({
    routes: {
        "*x": "defaultRoute",
        // matches http://example.com/#anything-here
    },

    initialize: function(){
        console.log("app_router initialized");
    }


});
