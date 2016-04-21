var ColorListCollection = Backbone.Collection.extend({
    model: ProductColorModel,
    /*url: '/Rogervivier_ui/desktop/common/newjs/collections/productColor_Data.json',*/

    initialize: function(){
        console.log("ColorListCollection initialized");
    }

});