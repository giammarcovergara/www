var ScopeModel = Backbone.Model.extend({

    url: location.protocol+"/"+location.host + document.location.pathname+"/jsonPost",

    defaults:{
    },

    initialize: function(){
        console.log("ScopeModel initialized");
    },

    callFetch:function(options){
        $.extend(options,this.setOptionDefault());
        this.fetch(options);
    },


    setOptionDefault: function() {

        var options = {
            contentType: "application/json",
            dataType: "json",
            type: 'POST',
            error: function (e) {
                console.log("ScopeModel fetch Fallita " + e);
            }
        };

        return options;
    }

});