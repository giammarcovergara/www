var ProductColorModel = Backbone.Model.extend({
  
  	defaults : {
		"code":"",
		"modelCode":"",
		"productUrl":"",
		"imageUrl":"",
		"creationData":0
	},
  
    initialize: function(){
        console.log("ProductColor initialized");
    }

});