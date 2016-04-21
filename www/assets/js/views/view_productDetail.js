
var app_router = new AppRouter(); // INIZIALIZZO LA DEFAULT ROUTER
var productDetailModel = new ProductDetailModel();
var scopeModel = new ScopeModel();
var AppProductDetailsView = Backbone.View.extend({
    //
    tmp: {
        thumb: {container: "#container-thumb-template", template: "#thumb-template"},
        product_img_hero: {container: "#container-product-img-hero-template", template: "#product-img-hero-template"},
        product_details: {container: "#container-product-details-template", template: "#product-details-template"},
        product_colors: {container: "#container-colors-template", template: "#colors-template"},
        product_details_size: {container: "#container-product-details-size-template", template: "#product-details-size-template"},
        product_details_size_out_of_stock: {container: "#container-product-details-size-template", template: "#product-details-size-template-out-of-stock"},
        product_details_size__last_in_stock: {container: "#container-product-details-size-template", template: "#product-details-size-template-last-in-stock"},
        product_img_hero_zoom_template: {container: "#container-product-img-hero-zoom-template", template: "#product-img-hero-zoom-template"}
    },
    events: {
        'click .content-dropdown a img': "addEventClickTo_linkimage"
    },
    addEventClickTo_linkimage: function (e) {

        RogerVivier.utility.unslick(".product-img-hero > div, .product-img-hero-zoom > div");
        RogerVivier.utility.unslick(".thumb");
      
        var url = location.protocol + "//" + location.host + "/RogerVivier/IT" + $(e.target).data("url");
        var urlController = url + ".json";

        urlController = "../../assets/data/productDetail_2.json"; // DA ELIMINARE QUANDO I SERVIZIO FUNZIONANO

        var onlyurl = $(e.target).data("url");

        if (RogerVivier.utility.isLeIe10()) {
            location.href = location.protocol + "//" + location.host + "/RogerVivier/IT" + url;
       } else {
            this.model.fetch({"url": urlController, success: function () {
                    app_router.navigate(onlyurl + location.search, true);
                }
            });
       }

    },

    initialize: function () {
        var self = this;

       if(RogerVivier.utility.checkTemplateExist(this.tmp)){
           return;
       }

        //RECUPERO TUTTI I TEMPLATE
        this.tmp_thumb = _.template($(this.tmp.thumb.template).html());
        this.tmp_product_img_hero = _.template($(this.tmp.product_img_hero.template).html());
        this.tmp_product_details_template = _.template($(this.tmp.product_details.template).html());
        this.tmp_product_details_size_template = _.template($(this.tmp.product_details_size.template).html());
        this.tmp_product_details_size_template_out_of_stock = _.template($(this.tmp.product_details_size_out_of_stock.template).html());
        this.tmp_product_details_size_template_last_in_stock = _.template($(this.tmp.product_details_size__last_in_stock.template).html());
        this.tmp_product_colors_template = _.template($(this.tmp.product_colors.template).html());
        this.tmp_product_img_hero_zoom_template = _.template($(this.tmp.product_img_hero_zoom_template.template).html());

        var options = {data: JSON.stringify({
            "application": [],
            "session": ["countryCode", "selectedBrand"],
            "properties": ["orderDetailsItem.colonnaLabel.two", "product.fashion.details", "product.fashion.size.guide","product.fashion.variants.size","product.fashion.variants.size.sold.out","product.fashion.variants.size.last.in.stock"]
        })};

        // da scommentare quando si hanno a disposizione i servizi e che funzioni
        //scopeModel.callFetch(options);

        this.model.on('change', this.render, this);
        app_router.on('route:defaultRoute', function () {

            var url = location.protocol + "/" + location.host + document.location.pathname;
            var urlController = url + ".json";
            urlController = "../../assets/data/productDetail.json"; // DA ELIMINARE QUANDO I SERVIZIO FUNZIONANO

            self.model.fetch({"url": urlController});

        });

        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start({pushState: true, root: '/'});

    },
    reset: function () {
        // TO DO
    },
    empty: function () {
        $(this.tmp.product_img_hero.container).empty();
        $(this.tmp.thumb.container).empty();
        $(this.tmp.product_colors.container).empty();

    },
    render: function () {

        console.log("start render");

        this.empty();

        var data = this.model.toJSON();
        var data_thumbnails = data.fashionProductData.firstVariant.thumbnails;
        var data_others = data.fashionProductData.firstVariant.others; // ZOOOM IMAGE
        var data_mapSizeByColour = data.fashionProductData.mapSizeByColour;
        var data_otherColours = data.otherColours;
        var self = this;

        var prop = scopeModel.toJSON().properties;
        // DA ELIMINARE QUANDO CI SONO I SERVIZI
        prop = {"application":null,"session":{"selectedBrand":"RogerVivier","countryCode":"IT"},"properties":{"product_fashion_variants_size":"taglia","orderDetailsItem_colonnaLabel_two":"Descrizione","product_fashion_details":"Dettagli","product_fashion_size_guide":"Guida alle taglie","product_fashion_variants_size_sold_out":"sold out","product_fashion_variants_size_last_in_stock":"last in stock"}};
        prop = prop.properties;

        //ALIMENTA IL TEMPLATE CON TUTTE LE INFORMAZIONI DEL PRODOTTO (DESCRIZIONE,PREZZO, COD, ECC.. ) SULLA DX
        $(this.tmp.product_details.container).html(this.tmp_product_details_template({data: data.fashionProductData, properties: prop}));

        //GENERA LA COMBO DELLE TAGLIE
        $.each(data_mapSizeByColour.ColorData, function (k, v) {
            var availableQuantity = data.fashionProductData.fashionVariantsProductData[k].availableQuantity;
            var overSellingQuantity = data.fashionProductData.fashionVariantsProductData[k].overSellingQuantity;
            var qtyInStock = availableQuantity - overSellingQuantity;
            var isOutOfStock = parseInt(qtyInStock) === 0 ? true : false;
            var activeLastProductAvailable = /*switchBack.activeLastProductAvailable*/ true;
            
            if (isOutOfStock) {
                $(self.tmp.product_details_size.container + " option:last").after(self.tmp_product_details_size_template_out_of_stock({size: v, properties: prop}));
            } else if (qtyInStock === 1 && activeLastProductAvailable) {
                $(self.tmp.product_details_size.container + " option:last").after(self.tmp_product_details_size_template_last_in_stock({size: v, properties: prop}));
            } else {
                $(self.tmp.product_details_size.container + " option:last").after(self.tmp_product_details_size_template({size: v}));
            }
        });

        //GENERA LE ZOOM IMAGE
        $.each(data_others, function (k, v) {
            $(self.tmp.product_img_hero_zoom_template.container).append(self.tmp_product_img_hero_zoom_template({zoom: v,data: data.fashionProductData}));
        });

        //GENERA LE THUMBNAIL CENTRALE (IMMAGINE CENTRALE + THUMBNAIL SULLA SX)
        $.each(data_thumbnails, function (k, v) {
            $(self.tmp.thumb.container).append(self.tmp_thumb({thumbnail: v, data: data.fashionProductData}));
            $(self.tmp.product_img_hero.container).append(self.tmp_product_img_hero({data: data.fashionProductData, index: k}));
        });

        //GENERA LA COMBO DEI COLORI
        $.each(data_otherColours, function (k, v) {
            $(self.tmp.product_colors.container).append(self.tmp_product_colors_template({colors: v, data: data.otherColours}));
        });


        // INZIZIALIZZA TUTTE LE FUNZIONI NECESSARIE PER IL CORRETTO FUNZIONAMENTO DELLA DETTAGLIO PRODOTTO.
        RogerVivier.productDetails.init();

        return this;
    },
    afterRender: function() {
        console.log('afterRender');
    }
});


$(function () {
    var appProductDetailsView = new AppProductDetailsView({el: $("body"), model: productDetailModel});
});