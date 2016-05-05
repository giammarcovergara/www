var RogerVivier = RogerVivier || {};

RogerVivier.utility = function() {
    "use strict";
    var module = {};
    module.isElementExist = function(el) {
        if ($(el).length > 0) {
            return true;
        }
        return false;
    };
    module.isNullOrEmpty = function(value) {
        if (value === undefined || value === null || value.toString() === "null" || value.toString() === "") {
            return true;
        }
        return false;
    };
    module.isNullOrEmptyElements = function(el) {
        var value = $(el).val();
        return this.isNullOrEmpty(value);
    };
    module.pad = function(str, max) {
        str = str.toString();
        return str.length < max ? this.pad("0" + str, max) : str;
    };
    module.isLeIe10 = function() {
        BrowserDetect.init();
        if (!RogerVivier.utility.isNullOrEmpty(BrowserDetect.browser) && BrowserDetect.browser === "Explorer" && parseInt(BrowserDetect.version) < 10) {
            return true;
        }
        return false;
    };
    var BrowserDetect = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function(data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;
                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function(dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }
            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },
        dataBrowser: [ {
            string: navigator.userAgent,
            subString: "Edge",
            identity: "MS Edge"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
        }, {
            string: navigator.userAgent,
            subString: "OPR",
            identity: "Opera"
        }, {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
        } ]
    };
    module.jsonToString = function(data) {
        return JSON.stringify(data);
    };
    module.backbone_templateSettings = function() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/gim,
            evaluate: /\{\{(.+?)\}\}/gim,
            escape: /\{\{\-(.+?)\}\}/gim
        };
    };
    module.unslick = function(selector) {
        $(selector).slick("unslick");
    };
    module.checkTemplateExist = function(tmp) {
        var esci = false;
        $.each(tmp, function(i, el) {
            if (!RogerVivier.utility.isElementExist(el.template)) {
                esci = true;
                return false;
            }
        });
        return esci;
    };
    return module;
}();

$(document).ready(function() {
    RogerVivier.utility.backbone_templateSettings();
});

var RogerVivier = RogerVivier || {};

RogerVivier.components = RogerVivier.components || {};

RogerVivier.page = RogerVivier.page || {};

RogerVivier.library = RogerVivier.library || {};

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

RogerVivier.library.openCloseMenu = function() {
    "use strict";
    var module = {};
    module.init = function() {};
    var openUnderMenu = function(id) {
        $("#" + id).addClass("open");
        $("[data-menu=" + id + "]").addClass("active");
    };
    var slideOpenUnderMenu = function(id) {
        $("#" + id).slideDown();
        $("[data-menu=" + id + "]").addClass("active");
    };
    var closeUnderMenu = function($menu, $menuSelectors) {
        $menu.removeClass("open");
        if ($menuSelectors.parents("div").filter(".active").length > 0) {
            $menuSelectors.parents("div").filter(".active").removeClass("active");
        } else {
            $menuSelectors.filter(".active").removeClass("active");
        }
    };
    var slideCloseUnderMenu = function($menu, $menuSelectors) {
        $menu.slideUp();
        $menuSelectors.filter(".active").removeClass("active");
    };
    module.toggleMenu = function($menuSelectors, $menu) {
        $menuSelectors.unbind();
        $menuSelectors.on("click", function(e) {
            var $this = $(this), dataMenu = RogerVivier.utility.isNullOrEmpty($this.parents("div").data("menu")) ? $this.data("menu") : $this.parents("div").data("menu"), isActive = $this.hasClass("active") ? $this.hasClass("active") : $this.parents("div").hasClass("active") ? $this.parents("div").hasClass("active") : false;
            if (isActive) {
                closeUnderMenu($menu, $menuSelectors);
            } else {
                closeUnderMenu($menu, $menuSelectors);
                openUnderMenu(dataMenu);
            }
        });
    };
    module.slideToggleMenu = function($menuSelectors, $menu) {
        $menuSelectors.on("click", function() {
            var $this = $(this), dataMenu = $this.data("menu");
            if ($this.hasClass("active")) {
                slideCloseUnderMenu($menu, $menuSelectors);
            } else {
                slideCloseUnderMenu($menu, $menuSelectors);
                slideOpenUnderMenu(dataMenu);
            }
        });
    };
    module.outsideClick = function($menuSelectors, $menu) {
        $(document).on("click", function(e) {
            var closeCondition = !$menu.is(e.target) && $menu.has(e.target).length === 0 && !$menuSelectors.is(e.target);
            if (closeCondition) {
                closeUnderMenu($menu, $menuSelectors);
            }
        });
    };
    module.slideOutsideClick = function($menuSelectors, $menu) {
        $(document).on("click", function(e) {
            var closeCondition = !$menu.is(e.target) && $menu.has(e.target).length === 0 && !$menuSelectors.is(e.target);
            if (closeCondition) {
                slideCloseUnderMenu($menu, $menuSelectors);
            }
        });
    };
    return module;
}();

RogerVivier.components.collapse = function() {
    "use strict";
    var module = {}, $collapseHandlerCommon = $(".collapse-wrapper .collapse-handler"), visibleSwitchCountry = $(".switch-country-mobile").is(":visible");
    $.fn.openCollapse = function() {
        var self = this;
        self.addClass("open");
        self.children(".collapse-content").slideDown(400);
    };
    $.fn.closeCollapse = function() {
        var self = this;
        self.removeClass("open");
        self.children(".collapse-content").slideUp(400);
        setTimeout(function() {
            self.children(".collapse-content").removeAttr("style");
        }, 420);
    };
    module.activeCollapse = function($collapseHandler) {
        $collapseHandler.on("click", function() {
            var $collapseOpened = $(".collapse-wrapper.open"), $collapseToOpen = $(this).parent();
            if ($collapseToOpen.hasClass("footer-mobile")) {
                if (visibleSwitchCountry) {
                    if ($(this).parent().hasClass("open")) {
                        $(this).parent().closeCollapse();
                    } else {
                        $collapseOpened.closeCollapse();
                        $collapseToOpen.openCollapse();
                    }
                }
            } else {
                if ($(this).parent().hasClass("open")) {
                    $(this).parent().closeCollapse();
                } else {
                    $collapseOpened.closeCollapse();
                    $collapseToOpen.openCollapse();
                }
            }
        });
    };
    $(window).resize(function() {
        visibleSwitchCountry = $(".switch-country-mobile").is(":visible");
    });
    module.activeCollapse($collapseHandlerCommon);
    return module;
}();

RogerVivier.components.video = function() {
    "use strict";
    var module = {}, $videoHandler = $(".video-article .play-video"), $layerVideo = $(".layer-video"), videoCounter = $(".video-wrapper").length;
    for (var i = 0; i < videoCounter; i++) {
        $(".video-wrapper").eq(i).attr("id", "video-wrapper-" + i);
    }
    $videoHandler.on("click", function(ev) {
        var $self = $(this), $videoPreview = $self.siblings("img"), dataUrl = $self.data("customurl"), dataType = $self.data("typevideo"), $videoWrapper = $self.closest(".video-article").find('div[id^="video-wrapper"]'), videoWrapperID = $videoWrapper.attr("id");
        if (!$.isEmptyObject(dataUrl)) {
            var playerInstance = jwplayer(videoWrapperID);
            playerInstance.setup({
                file: dataUrl,
                skin: "/vendor/jwplayer/five.xml",
                width: "100%",
                height: "100%",
                autostart: true
            });
            $videoWrapper.fadeIn(600, function() {
                $videoPreview.fadeTo(500, .01);
            });
        }
    });
    return module;
}();

RogerVivier.components.select = function() {
    "use strict";
    var module = {}, $select = $(".custom-select"), options = {
        mobile: true
    };
    module.initSelect = function() {
        var selector_select = ".custom-select";
        if (RogerVivier.utility.isElementExist(selector_select)) {
            $(selector_select).dropkick(options);
        }
    };
    return module;
}();

RogerVivier.components.tabs = function() {
    "use strict";
    var module = {};
    $.fn.openTabs = function() {
        var self = $(this);
        var itemToOpen = $($(this).data("id"));
        self.addClass("open");
        itemToOpen.addClass("open");
    };
    $.fn.closeTabs = function() {
        var self = $(this);
        var itemToclose = $($(this).data("id"));
        self.removeClass("open");
        itemToclose.removeClass("open");
    };
    module.activeTabs = function($tabsClick, $tabsScrollbar) {
        $tabsClick.on("click", function(event) {
            event.preventDefault();
            var $tabsOpened = $(".navigation .open"), $self = $(this);
            if (!$self.hasClass("open")) {
                $tabsOpened.closeTabs();
                $self.openTabs();
                $tabsScrollbar.perfectScrollbar("update");
            }
        });
    };
    return module;
}();

RogerVivier.components.dropdown = function() {
    "use strict";
    var module = {};
    module.init = function() {
        RogerVivier.components.dropdown.addEventClicFor_dropdown();
    };
    var openCloseDropdown = function($dropdownContainer) {
        $dropdownContainer.toggleClass("open");
    };
    var closeDropdown = function() {
        $(".dropdown").removeClass("open");
    };
    module.activeDropdown = function($dropdownClick) {
        $dropdownClick.on("click", function(event) {
            event.preventDefault();
            var $dropdownContainer = $(this).parent("div").parent(".dropdown");
            if (!$dropdownContainer.hasClass("open")) {
                closeDropdown();
                openCloseDropdown($dropdownContainer);
            } else {
                openCloseDropdown($dropdownContainer);
            }
        });
    };
    module.addEventClicFor_dropdown = function() {
        $(document).on("click", function(e) {
            var dropdownTargetClose = !$(".dropdown .btn-dropdown, .dropdown .content-dropdown, .dropdown .content-dropdown li, .dropdown .content-dropdown div, .dropdown .content-dropdown span").is(e.target);
            if (dropdownTargetClose) {
                closeDropdown();
            }
        });
    };
    return module;
}();

RogerVivier.components.modale = function() {
    "use strict";
    var module = {}, $allModal = $('[id^="modalblack-"], [id*=" modalblack-"]'), $modalTarget = $(".modal-cont, .modal-cont *"), $body = $("body");
    module.init = function() {
        var $element = $body.find("*[data-modale]");
        $.each($element, function(i, val) {
            var $self = $(val), $modale = $($(val).data("modale"));
            module.bindEvents($self, $modale);
        });
    };
    var openModale = function($modale) {
        $body.addClass("modal-open");
        $modale.addClass("modal-active-move");
        setTimeout(function() {
            $body.addClass("modal-active");
            $modale.addClass("modal-active");
        }, 10);
    };
    var closeModale = function() {
        $allModal.removeClass("modal-active");
        $body.removeClass("modal-active");
        $body.removeClass("modal-open");
        setTimeout(function() {
            $allModal.removeClass("modal-active-move");
        }, 350);
    };
    module.bindEvents = function($self, $modale) {
        $self.on("click tap", function(event) {
            openModale($modale);
        });
        $allModal.on("click tap", function(e) {
            var $closeBtn = $modale.find(".modal-cont .close, .modal-cont .close i");
            if ($closeBtn.is(e.target)) {
                closeModale();
                return false;
            } else if (!$modalTarget.is(e.target) && !$(".dk-selected, .dk-option").is(e.target)) {
                closeModale();
                return false;
            }
        });
    };
    return module;
}();

RogerVivier.components.header = function() {
    "use strict";
    var module = {}, $underMenuElements = $(".under-menu-element > span"), $underMenu = $(".under-menu"), $menu = $("#menu"), $navElements = $("li", $menu), $subNavElements = $("li > ul > li", $menu), $header = $("header");
    var closeUnderMenu = function($menu) {
        $menu.removeClass("open");
        $(".under-menu-element.active").removeClass("active");
    };
    var openNavMenu = function($listElement) {
        $listElement.addClass("active");
        navMenuLine();
    };
    var navMenuLine = function() {
        var menuActive = $(".nav-menu:visible"), $listElementActive = $("#menu .active");
        if (menuActive.length === 1 && $listElementActive.length >= 1) {
            var $offsetLeftListElement = $listElementActive.offset(), $widthListElement = $listElementActive.width();
            $(".menu__line").attr("style", "width:" + $widthListElement + "px; -webkit-transform: translate3d(" + $offsetLeftListElement.left + "px, 0, 0); transform: translate3d(" + $offsetLeftListElement.left + "px, 0, 0);");
        }
    };
    var closeNavMenu = function($menu) {
        var $activeElements = $(" > li.active", $menu);
        $activeElements.removeClass("active");
    };
    var activeSubNavMenu = function($listElement) {
        $listElement.addClass("active");
    };
    var deactiveSubNavMenu = function($listElement) {
        $listElement.removeClass("active");
    };
    RogerVivier.library.openCloseMenu.toggleMenu($underMenuElements, $underMenu);
    $(document).on("click", function(e) {
        var $underMenuContainer = $(".under-menu"), $subNavMenuContainer = $("li > ul", $menu), $menuOpened = $(".under-menu.open"), $headerElement = $(".under-menu-element span"), $subNavElement = $("li a", $menu), underMenuCondition = !$underMenuContainer.is(e.target) && $underMenuContainer.has(e.target).length === 0 && !$headerElement.is(e.target), subNavCondition = !$subNavMenuContainer.is(e.target) && $subNavMenuContainer.has(e.target).length === 0 && !$subNavElement.is(e.target), $subNavMenu = $("#menu li > ul").is(e.target);
        if (underMenuCondition) {
            closeUnderMenu($menuOpened);
        }
        if (subNavCondition && !$subNavMenu) {
            closeNavMenu($menu);
            $header.removeClass("open");
        }
    });
    $(window).resize(function() {
        navMenuLine();
    });
    $navElements.on("click", function(e) {
        var $subNavMenu = $("#menu li > ul").is(e.target);
        if ($(this).hasClass("active") && !$subNavMenu) {
            closeNavMenu($menu);
            $header.removeClass("open");
        } else if (!$subNavMenu) {
            closeNavMenu($menu);
            openNavMenu($(this));
            $header.addClass("open");
        }
    });
    $subNavElements.mouseenter(function() {
        activeSubNavMenu($(this));
    }).mouseleave(function() {
        deactiveSubNavMenu($(this));
    });
    $("#menu").slicknav({
        label: "",
        prependTo: ".page-container"
    });
    $(".slicknav_nav").removeAttr("style");
    $(".slicknav_btn").on("click", function() {
        $(".slicknav_nav").addClass("blocked");
        $(".page-container").toggleClass("darken");
        $("html").toggleClass("wrapper-hidden");
    });
    $('*[data-menu="menu-cart"]').on("click", function() {
        $(".cart-dark-container").toggleClass("darken");
        $("html").toggleClass("wrapper-hidden");
    });
    $(".close-cart-mobile").on("click", function() {
        $(".cart-dark-container").removeClass("darken");
        $("html").removeClass("wrapper-hidden");
        $('*[data-menu="menu-cart"]').removeClass("active");
        $("#menu-cart").removeClass("open");
    });
    $(".cart-dark-container").on("click", function() {
        $(this).removeClass("darken");
        $("html").toggleClass("wrapper-hidden");
    });
    $(".page-container").on("click", function() {
        if ($(this).hasClass("darken") && $(".slicknav_nav.blocked:hover").length == 0 && $(".slicknav_btn:hover").length == 0) {
            $(this).removeClass("darken");
            $("html").toggleClass("wrapper-hidden");
            $("#menu").slicknav("close");
        }
    });
    $(".slicknav_menu .slicknav_nav > li > a").on("click", function() {
        if ($(this).parent().hasClass("slicknav_collapsed")) {
            $(".slicknav_menu .slicknav_nav > li").not($(this).parent()).each(function() {
                $(this).removeClass("slicknav_open").addClass("slicknav_collapsed");
                $("> ul", $(this)).addClass("slicknav_hidden").css("display", "none");
            });
        }
    });
    $(".item-container ul").perfectScrollbar();
    return module;
}();

RogerVivier.components.scrollEffect = function() {
    "use strict";
    var module = {};
    module.initEffect = function($effectContent) {
        $(window).on("scroll", function() {
            var scrollTop = $(window).scrollTop(), offset = $(window).height() - 40;
            $effectContent.each(function(ind, self) {
                if (scrollTop > $(self).offset().top - offset) {
                    $(self).addClass("visible");
                } else {
                    $(self).removeClass("visible");
                }
            });
        });
        var scrollTop = $(window).scrollTop(), offset = $(window).height() - 80;
        $effectContent.each(function(ind, self) {
            if (scrollTop > $(self).offset().top - offset) {
                $(self).addClass("visible");
            } else {
                $(self).removeClass("visible");
            }
        });
    };
    return module;
}();

RogerVivier.page.productGrid = function() {
    "use strict";
    var module = {}, $menuSelector = $(".filter-element"), $menu = $(".filter-menu"), $effectContent = $(".product-grid-list .item");
    RogerVivier.library.openCloseMenu.toggleMenu($menuSelector, $menu);
    RogerVivier.components.scrollEffect.initEffect($effectContent);
    $(window).resize(function() {
        RogerVivier.components.scrollEffect.initEffect($effectContent);
    });
    return module;
}();

RogerVivier.page.homePage = function() {
    "use strict";
    var module = {};
    module.init = function() {
        initCarouselHero();
    };
    var initCarouselHero = function() {
        var $carouselHero = $(".hero-carousel .carousel");
        if (RogerVivier.utility.isElementExist($carouselHero.find("img"))) {
            $carouselHero.slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                fade: false
            });
        }
    };
    return module;
}();

RogerVivier.page.maison = function() {
    "use strict";
    var module = {};
    module.init = function() {
        initParallaxCarousel1();
        initParallaxCarousel2();
        initVideoCarousel();
    };
    var initParallaxCarousel1 = function() {
        var $maisonCarousel = $(".module-carousel-type1 .parallax-carousel-wrapper .carousel");
        if (RogerVivier.utility.isElementExist($maisonCarousel.find("img"))) {
            $maisonCarousel.slick({
                dots: false,
                infinite: true,
                speed: 300,
                adaptiveHeight: true,
                fade: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [ {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    }
                } ]
            });
        }
    };
    var initParallaxCarousel2 = function() {
        var $maisonCarousel = $(".module-carousel-type2 .parallax-carousel-wrapper .carousel");
        if (RogerVivier.utility.isElementExist($maisonCarousel.find("img"))) {
            $maisonCarousel.slick({
                dots: false,
                infinite: true,
                speed: 300,
                adaptiveHeight: true,
                fade: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [ {
                    breakpoint: 768,
                    settings: {
                        centerMode: true,
                        variableWidth: true,
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    }
                } ]
            });
        }
    };
    var initVideoCarousel = function() {
        var $videoCarousel = $(".module-video .video-carousel-wrapper .carousel"), dotsOpt;
        if (RogerVivier.utility.isElementExist($videoCarousel)) {
            $videoCarousel.each(function() {
                dotsOpt = $(this).hasClass("thumbs-carousel");
                $(this).slick({
                    dots: dotsOpt,
                    infinite: true,
                    speed: 300,
                    adaptiveHeight: true,
                    fade: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: dotsOpt,
                    arrows: false
                });
            });
        }
    };
    return module;
}();

$(document).ready(function() {
    RogerVivier.components.select.initSelect();
    RogerVivier.components.dropdown.init();
    RogerVivier.page.homePage.init();
    RogerVivier.page.maison.init();
    var $effectContent = $(".block-template-icons, .block-template-icons .container article, .collections-row > a, .collections-row > div, .grid-layout-section article");
    RogerVivier.components.scrollEffect.initEffect($effectContent);
    $(window).resize(function() {
        RogerVivier.components.scrollEffect.initEffect($effectContent);
    });
    RogerVivier.components.modale.init();
});

$(window).load(function() {
    setTimeout(function() {
        $("#preloader").fadeOut(300);
        var $effectContent2 = $(".babylongrid-container .column article");
        RogerVivier.components.scrollEffect.initEffect($effectContent2);
        $(window).resize(function() {
            RogerVivier.components.scrollEffect.initEffect($effectContent2);
        });
    }, 1e3);
});

var RogerVivier = RogerVivier || {};

RogerVivier.breadcrumbBehavior = RogerVivier.breadcrumbBehavior || {};

RogerVivier.breadcrumbBehavior.share = function() {
    "use strict";
    var module = {}, $iconsShare = $(".share-open-breadcrumb , .share-label"), $contentShare = $(".content-icons-share"), $closeShare = $(".subcontent-icons-share span");
    $closeShare.on("click tap", function(e) {
        $contentShare.removeClass("active-share");
    });
    $iconsShare.on("click tap", function() {
        $contentShare.addClass("active-share");
    });
    return module;
}();

RogerVivier.components.checkout = function() {
    "use strict";
    var module = {};
    module.init = function() {
        initCarouselLogin();
        initRegisterClick();
        initGuestClick();
        initBackClick();
        initPaymentClick();
        initNewCardClick();
        carosuselThankyouPage();
    };
    var $registerClick = $(".checkout-login .cont-button #register-btn"), $guestClick = $(".checkout-login .cont-button #guest-btn"), $backClick = $(".checkout-login .cont-button .btn-back"), $paymentClick = $(".order-summary .cont-button input"), $newCard = $("#paymentModeForm input:radio");
    var initCarouselLogin = function() {
        var $carouselLogin = $(".checkout-login .carousel-login, .carousel-shipping-payment");
        $carouselLogin.slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            fade: false,
            swipe: false
        });
    };
    var moveCarousel = function($textH2, $slideIndex, indexActiveTab) {
        var $textTitle = $(".checkout > h2"), $carousel = $(".checkout-login .carousel-login, .carousel-shipping-payment"), $scrollOffset = $(".step").offset().top, $step = $(".step li");
        $textTitle.html($textH2);
        $carousel.slick("slickGoTo", $slideIndex);
        $("html, body").animate({
            scrollTop: $scrollOffset
        }, 400);
        $.each($step, function(i, val) {
            if (indexActiveTab == i) {
                $(val).addClass("active");
            } else {
                $(val).removeClass("active");
            }
        });
    };
    var initRegisterClick = function() {
        $registerClick.on("click", function(e) {
            e.preventDefault();
            moveCarousel("<span>Checkout</span> Login/register", 1, 0);
        });
    };
    var initGuestClick = function() {
        $guestClick.on("click", function(e) {
            e.preventDefault();
            moveCarousel("<span>Checkout</span> Login / Guest", 2, 0);
        });
    };
    var initBackClick = function() {
        $backClick.on("click", function(e) {
            e.preventDefault();
            moveCarousel("<span>Checkout</span> Login", 0, 0);
        });
    };
    var initPaymentClick = function() {
        $paymentClick.on("click", function(e) {
            e.preventDefault();
            moveCarousel("<span>Checkout</span> Payment", 1, 2);
        });
    };
    var initNewCardClick = function() {
        $newCard.on("click", function(e) {
            if ($(this).is('[value="paymentModeDetailCCP"]')) {
                $(".insert-new-credit-card").addClass("activeNewCard");
                $(".carousel-shipping-payment").slick("setPosition");
            } else {
                $(".insert-new-credit-card").removeClass("activeNewCard");
                $(".carousel-shipping-payment").slick("setPosition");
            }
        });
    };
    var carosuselThankyouPage = function() {
        var $carouselThankyou = $(".ty-carousel .carousel");
        if (RogerVivier.utility.isElementExist($carouselThankyou.find("img"))) {
            $carouselThankyou.slick({
                lazyLoad: "ondemand",
                autoplay: true,
                autoplaySpeed: 2e3,
                infinite: true,
                speed: 500,
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [ {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                } ]
            });
        }
    };
    return module;
}();

RogerVivier.components.checkout.init();

var RogerVivier = RogerVivier || {};

RogerVivier.components = RogerVivier.components || {};

RogerVivier.components.dragNdrop = function() {
    "use strict";
    var module = {}, $dragNdropContainer = $(".dragNdrop-container"), $heronizeButton = $dragNdropContainer.find(".heronize");
    module.initGrid = function($containerSelector) {
        var windowWidth = $(window).width(), tabletSize = 1024, $items = $containerSelector.find(".item"), $heroItems = $items.filter(".hero"), $heroLinks = $heroItems.find(".item-link"), $notHeroItems = $items.not(".hero"), $notHeroFirstItem = $notHeroItems.first(), colSpanAttr = "data-ss-colspan", desktopPaddingBottom = Math.floor($notHeroFirstItem.outerWidth(true) * 1.24), mobilePaddingBottom = Math.floor($notHeroFirstItem.outerHeight(true)), options = {
            align: "left",
            minColumns: 3,
            maxColumns: 4,
            gutterX: 0,
            gutterY: 0,
            paddingX: 0,
            paddingY: 0,
            enableResize: true,
            enableDrag: true,
            columns: 3
        };
        $heroItems.attr(colSpanAttr, "1");
        $heroLinks.css("padding-bottom", mobilePaddingBottom - 1);
        if (windowWidth >= tabletSize) {
            options.columns = 4;
            $notHeroItems.find(".item-link").css("padding-bottom", desktopPaddingBottom);
            $heroLinks.css("padding-bottom", 2 * desktopPaddingBottom + 1);
            $heroItems.attr(colSpanAttr, "2");
        }
        $containerSelector.shapeshift(options);
    };
    module.heronize = function($heroButton) {
        var $itemParent = $heroButton.closest(".item"), $itemsContainer = $heroButton.closest(".dragNdrop-container");
        console.log($itemParent);
        if ($itemParent.hasClass("hero")) {
            $itemParent.removeClass("hero");
            $itemParent.attr("data-ss-colspan", "1");
            $(this).find("span").fadeOut();
        } else {
            $itemParent.addClass("hero");
            $itemParent.attr("data-ss-colspan", "2");
            $(this).find("span").fadeIn();
        }
        setTimeout(function() {
            module.initGrid($itemsContainer);
        }, 500);
    };
    module.bindEvents = function() {
        $heronizeButton.on("click", function() {
            module.heronize($(this));
        });
    };
    module.init = function() {
        module.initGrid($dragNdropContainer);
        module.bindEvents();
        $(window).bind("resizeEnd", function() {
            setTimeout(function() {
                module.initGrid($dragNdropContainer);
            }, 250);
        });
        $(window).resize(function() {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function() {
                $(this).trigger("resizeEnd");
            }, 500);
        });
    };
    return {
        load: function() {
            module.init();
        }
    };
}();

$(document).ready(function() {
    RogerVivier.components.dragNdrop.load();
});

RogerVivier.components.checkout = function() {
    "use strict";
    var module = {};
    module.init = function() {
        initCarouselLogin();
        initLoginBackClick();
        initLoginRegisterClick();
    };
    var $loginRegisterClick = $(".login-page .cont-button .register-btn"), $loginBackClick = $(".login-page .cont-button .btn-back");
    var initCarouselLogin = function() {
        var $carouselLogin = $(".login-page .carousel-login");
        $carouselLogin.slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            fade: false,
            swipe: false
        });
    };
    var moveCarousel = function(slideIndex) {
        var $carousel = $(".login-page .carousel-login"), $target = $(".login-page"), targetTop = $target.offset() ? $target.offset().top : 0, scrollOffset = targetTop - 40;
        $carousel.slick("slickGoTo", slideIndex);
        $("html, body").animate({
            scrollTop: scrollOffset
        }, 400);
    };
    var initLoginBackClick = function() {
        $loginBackClick.on("click", function(e) {
            e.preventDefault();
            moveCarousel(0);
        });
    };
    var initLoginRegisterClick = function() {
        $loginRegisterClick.on("click", function(e) {
            e.preventDefault();
            moveCarousel(1);
        });
    };
    return module;
}();

RogerVivier.components.checkout.init();

var RogerVivier = RogerVivier || {};

RogerVivier.page = RogerVivier.page || {};

RogerVivier.components.navgridlayout = function() {
    "use strict";
    var module = {};
    $(window).load(function() {
        var fixElement = function($obj, scroll, fixPosition) {
            if (scroll >= fixPosition) {
                $obj.addClass(fixClass);
            } else {
                $obj.removeClass(fixClass);
            }
            return;
        }, getSectionPositions = function($objList) {
            var positions = [], offset = $(".background-value").outerHeight(), lastObjHeight = $objList.eq($objList.length - 1).height();
            $objList.each(function() {
                var thisPos = $(this).position().top;
                positions.push(thisPos - offset);
            });
            positions.push(positions[positions.length - 1] + lastObjHeight);
            return positions;
        }, checkSectionPositions = function(posList, scroll) {
            var listLength = posList.length, sectionDigits;
            for (var i = 0; i <= listLength - 1; i++) {
                if (scroll >= posList[i] && scroll < posList[i + 1]) {
                    sectionDigits = $navSections.eq(i).data("year");
                    changeDigit(sectionDigits.toString());
                    activeItem($navItems.eq(i));
                    navRatioCheck();
                }
            }
        }, changeDigit = function(year) {
            var listLength = year.length, actualDigit;
            for (var i = 0; i < listLength; i++) {
                actualDigit = $('*[class^="digit-list active-"]').eq(i).data("digit");
                if (actualDigit != year[i]) {
                    $('*[class^="digit-list active-"]').eq(i).data("digit", year[i]).removeClass("active-" + actualDigit).addClass("active-" + year[i]);
                }
            }
        }, activeItem = function($item) {
            $navItems.removeClass("active");
            $item.addClass("active");
        }, defixElem = function($obj, scroll) {
            var objHeight = $obj.outerHeight(), heightDiff = footerPos - objHeight, offset = 30;
            if (scroll >= heightDiff - offset) {
                $obj.parent().css("margin-top", heightDiff - offset - scroll);
            } else {
                $obj.parent().css("margin-top", 0);
            }
        }, openNav = function() {
            $nav.toggleClass("closed");
        }, navReset = function() {
            $(".section-nav .nav-up").addClass("hidden");
            $(".section-nav .nav-down").addClass("hidden");
            $(".item-list").css("marginTop", 0);
        }, navRatioCheck = function() {
            var heightRatio = Math.ceil(navListHeight / windowHeight), countItems = $navItems.length, activeIndex = $(".item-list .item.active").index();
            if (heightRatio == 1) {
                navReset();
            } else {
                if (activeIndex < 0) {
                    $(".section-nav .nav-down").removeClass("hidden");
                } else {
                    navActivePosition(activeIndex);
                }
            }
        }, navActivePosition = function(activeIndex) {
            var itemsInView = Math.floor((windowHeight - 30) / navItemsHeight), navRotations = Math.floor(activeIndex / itemsInView), heightInView = $nav.height(), maxRotations = Math.ceil($navItems.length / itemsInView);
            navRotation(navRotations);
        }, navRotation = function(rotations) {
            var heightInView = $nav.height(), itemsInView = Math.floor((windowHeight - 40) / navItemsHeight), maxRotations = Math.ceil($navItems.length / itemsInView), marginDelta = -heightInView * rotations;
            arrowClick = rotations;
            $(".section-nav .item-list").css("marginTop", marginDelta);
            if (rotations == maxRotations - 1) {
                $(".section-nav .nav-up").removeClass("hidden");
                $(".section-nav .nav-down").addClass("hidden");
            } else if (rotations == 0) {
                $(".section-nav .nav-down").removeClass("hidden");
                $(".section-nav .nav-up").addClass("hidden");
            } else {
                $(".section-nav .nav-up").removeClass("hidden");
                $(".section-nav .nav-down").removeClass("hidden");
            }
        }, getNavTop = function(offset) {
            var checkPage = $(".main-title-caption") ? true : false, mobileTitleVis = $(".main-title-caption.mobile").is(":visible"), $titleCaption = checkPage && mobileTitleVis ? $(".main-title-caption.mobile") : $(".main-title-caption.desktop"), headerHeight = $("header").outerHeight(), breadcrumbsHeight = $(".breadcrumb").outerHeight(), titleTop = $titleCaption.position() ? $titleCaption.position().top : 0, titleHeight = $titleCaption.outerHeight(true);
            return titleTop + titleHeight + headerHeight + breadcrumbsHeight - offset;
        }, setNavPadding = function(offset) {
            var checkPage = $(".main-title-caption") ? true : false, mobileTitleVis = $(".main-title-caption.mobile").is(":visible"), $titleCaption = checkPage && mobileTitleVis ? $(".main-title-caption.mobile") : $(".main-title-caption.desktop"), titleTop = $titleCaption.position() ? $titleCaption.position().top : 0, titleHeight = $titleCaption.outerHeight(true), navPadding = titleTop + titleHeight + 10 - offset;
            $nav.css("padding-top", navPadding);
        };
        var $nav = $(".section-nav"), $navList = $nav.find(".item-list"), $background = $(".nav-gridlayout-background"), $backgroundVal = $background.find(".background-value"), backgroundTop = $background.position() ? $background.position().top : "", fixClass = "fixed", $navSections = $(".nav-grid-layout-section"), sectionPos = getSectionPositions($navSections), $navItems = $nav.find(".item"), navItemsHeight = $navItems.outerHeight(), footerPos = $(".footer").position().top, navMarginOffset = $(".section-nav .item-list .item").outerHeight(), navListHeight = $(".section-nav .item-list").outerHeight(), windowHeight = $(window).height(), arrowClick = 0, scroll = $(window).scrollTop(), navTop = getNavTop(60), resizeDone;
        navRatioCheck();
        fixElement($nav, scroll, navTop);
        fixElement($background, scroll, backgroundTop);
        setNavPadding(60);
        $(window).on("resize", function() {
            clearTimeout(resizeDone);
            resizeDone = setTimeout(function() {
                sectionPos = getSectionPositions($navSections);
                footerPos = $(".footer").position().top;
                windowHeight = $(window).height();
                navTop = getNavTop(60);
                setNavPadding(60);
                navRatioCheck();
            }, 100);
        });
        $(window).on("scroll", function() {
            var scroll = $(this).scrollTop();
            var $navFixed = $(".section-nav.fixed");
            fixElement($nav, scroll, navTop);
            fixElement($background, scroll, backgroundTop);
            checkSectionPositions(sectionPos, scroll);
            defixElem($navList, scroll);
            defixElem($backgroundVal, scroll);
        });
        $(".nav-open").on("click", function() {
            openNav();
        });
        $navItems.on("click", function(ind, elem) {
            var itemIndex = $(this).index();
            sectionPos = getSectionPositions($navSections);
            activeItem($(this));
            $("html, body").animate({
                scrollTop: sectionPos[itemIndex] + 2
            }, 700);
            openNav();
        });
        $(".nav-down").on("click", function() {
            arrowClick++;
            navRotation(arrowClick);
        });
        $(".nav-up").on("click", function() {
            arrowClick--;
            navRotation(arrowClick);
        });
    });
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.page = RogerVivier.page || {};

RogerVivier.components = RogerVivier.components || {};

RogerVivier.components.parallaxgridlayout = function() {
    "use strict";
    var module = {}, $parallaxContainer = $(".parallax-container"), $switchVideoCarousel = $parallaxContainer.find(".switch-video-carousel"), $videoGridContainer = $(".module-video .video-grid-container"), $videoCarousel = $(".module-video .carousel"), $playVideoButton = $(".play-video"), $items = $videoGridContainer.find(".video-article"), $heroItems = $items.filter(".hero-video"), $notHeroItems = $items.not(".hero-video"), $notHeroFirstItem = $notHeroItems.first(), $viewVideoButton = $notHeroItems.find("img, .article-caption");
    module.initGrid = function($containerSelector) {
        var windowWidth = $(window).width(), mobileSize = 768, colSpanAttr = "data-ss-colspan", desktopPaddingBottom = Math.floor($notHeroFirstItem.outerWidth(true) * 1.24), mobilePaddingBottom = Math.floor($notHeroFirstItem.outerHeight(true)), options = {
            align: "left",
            minColumns: 2,
            maxColumns: 4,
            gutterX: 0,
            gutterY: 0,
            paddingX: 0,
            paddingY: 0,
            enableResize: true,
            enableDrag: true,
            columns: 4
        };
        $heroItems.attr(colSpanAttr, "2");
        $notHeroItems.attr(colSpanAttr, "1");
        if (windowWidth <= mobileSize) {
            options.columns = 2;
            $heroItems.attr(colSpanAttr, "2");
            $notHeroItems.attr(colSpanAttr, "1");
        }
        $containerSelector.shapeshift(options);
    };
    module.loadVideo = function($thumbButton) {
        var $itemParent = $thumbButton.closest(".grid-item"), $videoParent = $(".hero-video"), $thumbsCarousel = $(".video-carousel-wrapper .carousel"), $videoWrapper = $("#video-wrapper-0"), urlToLoad = $itemParent.find(".article-caption").data("video-url"), srcToLoad = $itemParent.find("img").attr("src"), captionToLoad = $itemParent.find(".article-caption").text(), topAutoScroll = $(".video-carousel-wrapper").length ? $(".video-carousel-wrapper").position().top : 0, windowWidth = $(window).width(), mobileSize = 768, skrollrAutoScroll = "translate(0px, -" + topAutoScroll + "px)";
        if ($(".jwplayer").length) {
            jwplayer().stop();
        }
        $thumbsCarousel.slick("slickGoTo", 0);
        $videoWrapper.after('<div id="video-wrapper-0" class="video-wrapper"></div>');
        $videoWrapper.remove();
        $playVideoButton.fadeIn();
        $playVideoButton.data("customurl", urlToLoad);
        $videoParent.find("img").finish().fadeTo(200, .05);
        $videoParent.find(".article-caption span").finish().fadeTo(200, .05);
        setTimeout(function() {
            $videoParent.find("img").attr("src", srcToLoad);
            $videoParent.finish().find("img").fadeTo(400, 1);
            $videoParent.find(".article-caption span").text(captionToLoad).fadeTo(400, 1);
        }, 220);
        if (windowWidth <= mobileSize && topAutoScroll) {
            if (navigator.appVersion.indexOf("Mobile") >= 0) {
                $("#skrollr-body").css("transform", skrollrAutoScroll);
            } else {
                $("html, body").animate({
                    scrollTop: topAutoScroll
                }, 500);
            }
        }
    };
    module.switchCarousel = function($button) {
        var $carousel = $button.closest(".carousel"), currentSlide = $carousel.slick("slickCurrentSlide"), switchToSlide = Math.abs(currentSlide - 1);
        $carousel.slick("slickGoTo", switchToSlide);
    };
    module.playVideo = function($playButton) {
        var $parentContainer = $playButton.closest(".layer-video");
        $playButton.fadeOut(300);
        setTimeout(function() {
            if ($(".parallax-container").length) {
                $parentContainer.css("padding-bottom", "56.25%");
            }
        }, 350);
    };
    module.bindEvents = function() {
        var $videoCarouselDots = $(".video-carousel-wrapper .slick-dots > li");
        $switchVideoCarousel.on("click", function() {
            module.switchCarousel($(this));
        });
        $playVideoButton.on("click", function() {
            module.playVideo($(this));
        });
        $viewVideoButton.on("click", function() {
            module.loadVideo($(this));
        });
        $videoCarouselDots.on("click", function() {
            setTimeout(function() {
                $videoCarousel.slick("setPosition");
            }, 300);
        });
    };
    module.skrollrInit = function() {
        $(window).load(function() {
            if ($(".parallax-container").length) {
                var s = skrollr.init({
                    easing: {
                        wtf: Math.random,
                        inverted: function(p) {
                            return 1 - p;
                        }
                    }
                });
                module.setHeight();
            }
        });
    };
    module.startAnimation = function(scroll) {
        var windowHeight = $(window).height(), $animatedObj = $(".startAnimationCall"), $module = $animatedObj.closest(".parallax-section"), startTop = $module.length ? $module.position().top - windowHeight / 2 : 0;
        if (scroll > startTop) {
            $animatedObj.addClass("start-animation");
        }
    };
    module.parallaxBackground = function() {
        var $parallaxBackgroundPanel = $(".scroll-parallax-panel");
        $parallaxBackgroundPanel.each(function() {
            var $panel = $(this), topPos = $panel ? $panel.position().top : 0, yPos = -($(window).scrollTop() - topPos) / 5, coords = "50% " + yPos + "px";
            $panel.css({
                backgroundPosition: coords
            });
        });
    };
    module.setHeight = function() {
        var evt = window.document.createEvent("UIEvents");
        evt.initUIEvent("resize", true, false, window, 0);
        window.dispatchEvent(evt);
    };
    module.init = function() {
        module.initGrid($videoGridContainer);
        module.bindEvents();
        module.skrollrInit();
        $(window).bind("resizeEnd", function() {
            setTimeout(function() {
                module.initGrid($videoGridContainer);
                $videoCarousel.slick("setPosition");
            }, 250);
        });
        $(window).resize(function() {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function() {
                $(this).trigger("resizeEnd");
                module.skrollrInit();
            }, 250);
        });
        $(window).scroll(function() {
            var scrollVal = $(window).scrollTop();
            module.startAnimation(scrollVal);
            module.parallaxBackground();
        });
        RogerVivier.components.scrollEffect.initEffect($(".parallax-article"));
    };
    return {
        load: function() {
            module.init();
        }
    };
}();

$(document).ready(function() {
    var $parallaxTemplateContainer = $(".parallax-container");
    if ($parallaxTemplateContainer.length > 0) {
        RogerVivier.components.parallaxgridlayout.load();
    }
});

$(window).load(function() {
    retinaImg("@2x");
    utility.setImageSrc();
    $(window).resize(function() {
        utility.setImageSrc();
    });
});

function retinaImg(suffix) {
    var resized = false;
    var breakpoint = utility.breakpoints();
    var holdBreakpoint = breakpoint;
    init();
    window.onresize = function() {
        resized = true;
        breakpoint = utility.breakpoints();
        init();
        holdBreakpoint = breakpoint;
    };
    function init() {
        var retinaSuffix = typeof suffix === "undefined" ? "@2x" : suffix;
        if (utility.isRetina()) {
            var images = document.getElementsByTagName("img");
            var image;
            var imageSrc;
            for (var i = 0; i < images.length; i += 1) {
                image = images[i];
                $el = $(image);
                if ($el.attr("retina") != "false") {
                    imageSrc = utility.getImageSrc($el.closest("[data-big]"));
                    if (imageSrc) {
                        imageSrcRetina = addRetinaSuffix(imageSrc);
                        if (!resized && imageExists(image)) {
                            $el.attr("src", imageSrcRetina);
                        } else if (resized && holdBreakpoint !== breakpoint && imageExists(image)) {
                            $el.attr("src", imageSrcRetina);
                        } else if (!imageExists(image)) {
                            $el.attr("src", imageSrc);
                        }
                    }
                }
            }
        }
        function imageExists(image) {
            var $this = $(image);
            var retina = false;
            if (utility.breakpoints() == "desktop") {
                if ($this.attr("desktop@2x") == "true") {
                    retina = true;
                }
            } else if (utility.breakpoints() == "tablet") {
                if ($this.attr("tablet@2x") == "true") {
                    retina = true;
                }
            } else if (utility.breakpoints() == "tablet-portrait") {
                if ($this.attr("mobile@2x") == "true") {
                    retina = true;
                }
            } else {
                if ($this.attr("mobile@2x") == "true") {
                    retina = true;
                }
            }
            return retina;
        }
        function suffixReplace(match) {
            return retinaSuffix + match;
        }
        function addRetinaSuffix(imageUrl) {
            var regexMatch = /\.\w+$/;
            var parts = imageUrl.split("?");
            parts[0] = parts[0].replace(regexMatch, suffixReplace);
            retinaPath = parts.join("?");
            return retinaPath;
        }
    }
}

var utility = function() {
    var self = {};
    self.isRetina = function() {
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        var retina = false;
        if (window.devicePixelRatio > 1) {
            retina = true;
        }
        if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            retina = true;
        }
        return retina;
    };
    self.breakpoints = function() {
        var windowWidth = $(window).width();
        var breakp = "";
        if (windowWidth > 1024) {
            breakp = "desktop";
        } else if (windowWidth > 768 && windowWidth <= 1024) {
            breakp = "tablet";
        } else if (windowWidth == 768) {
            breakp = "tablet-portrait";
        } else {
            breakp = "mobile";
        }
        return breakp;
    };
    self.getImageSrc = function($item) {
        var imageSrc;
        $($item).each(function() {
            var srcBig = $(this).data("big");
            var srcMedium = $(this).data("medium");
            var srcMediumPortrait = $(this).data("medium-portrait");
            var srcSmall = $(this).data("small");
            if ((typeof srcBig === "undefined" || srcBig === null) && (typeof srcMedium === "undefined" || srcMedium === null) && (typeof srcMediumPortrait === "undefined" || srcMediumPortrait === null) && (typeof srcSmall === "undefined" || srcSmall === null)) {
                return false;
            } else {
                if (utility.breakpoints() == "desktop") {
                    imageSrc = srcBig;
                } else if (utility.breakpoints() == "tablet") {
                    imageSrc = srcMedium;
                } else if (utility.breakpoints() == "tablet-portrait") {
                    if (typeof srcMediumPortrait === "undefined" || srcMediumPortrait === null) {
                        imageSrc = srcMedium;
                    } else {
                        imageSrc = srcMediumPortrait;
                    }
                } else {
                    imageSrc = srcSmall;
                }
            }
        });
        return imageSrc;
    };
    self.setImageSrc = function() {
        if (!utility.isRetina()) {
            $this = this;
            $("img").each(function() {
                $el = $(this);
                $el.attr("src", $this.getImageSrc($el.closest("[data-big]")));
            });
        }
    };
    self.validateEmail = function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };
    self.getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    self.toggleWrapper = function(wrapper, click) {
        var $wrapper = $(wrapper);
        var $click = $(click);
        $click.on("click", function(e) {
            e.preventDefault();
            $wrapper.toggleClass("open");
        });
    };
    self.timelinePosition = function() {
        var timeline = $(".timeline");
        var timelineParent = timeline.parent();
        timeline.css("left", timelineParent.width() + timelineParent.offset().left);
    };
    return self;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.productCareTemplate = RogerVivier.productCareTemplate || {};

RogerVivier.productCareTemplate.behavior = function() {
    "use strict";
    var module = {};
    module.collapseNavigation = function() {
        $(".fake-option a").on("click tap", function() {
            var $this = $(this);
            if ($(".product-care-section-mobile ul").hasClass("collapse")) {
                $this.parents("ul").removeClass("collapse");
            } else {
                $this.parents("ul").addClass("collapse");
            }
        });
        $(".product-care-section-mobile a").on("click tap", function() {
            var $thisLi = $(this).parent(".item-menu"), $this = $(this);
            var textAnchor = $this.text();
            $(".product-care-section-mobile .item-menu").removeClass("selected");
            $thisLi.addClass("selected");
            $(".fake-option a").text(textAnchor);
            $thisLi.parents("ul").removeClass("collapse");
        });
        $(".product-care-section a").on("click tap", function() {
            var $this = $(this);
            $(".product-care-section .item-menu a").removeClass("selected");
            $this.addClass("selected");
        });
    };
    module.tabNavigation = function() {
        $(".product-care-section .item-menu").on("click tap", function() {
            var $this = $(this), current = $this.index(), $items = $("section");
            $items.removeClass("current");
            $items.eq(current + 1).addClass("current");
        });
        $(".product-care-section-mobile .item-menu").on("click tap", function() {
            var $this = $(this), current = $this.index(), $items = $("section");
            $items.removeClass("current");
            $items.eq(current).addClass("current");
        });
    };
    $(function() {
        module.collapseNavigation();
        module.tabNavigation();
    });
    return module;
}();

RogerVivier.components.product = function() {
    "use strict";
    var module = {};
    module.init = function() {
        var $tabsClick = $(".tabs-component .navigation li a"), $tabsScrollbar = $(".tabs-component > div"), $dropdownColourClick = $(".cont-colour .btn-dropdown"), $dropdownNeedhelpClick = $(".cont-need-help .btn-dropdown"), $dropdownShareClick = $(".cont-share .btn-dropdown"), $infoLegalScroll = $("#info-legal .collapse-handler");
        RogerVivier.components.tabs.activeTabs($tabsClick, $tabsScrollbar);
        RogerVivier.components.dropdown.activeDropdown($dropdownColourClick);
        RogerVivier.components.dropdown.activeDropdown($dropdownNeedhelpClick);
        RogerVivier.components.dropdown.activeDropdown($dropdownShareClick);
        $tabsScrollbar.perfectScrollbar();
        $infoLegalScroll.on("click", function(event) {
            event.preventDefault();
            var $selfPosition = $(this).parent("div").index(".collapse-wrapper"), $self = $(this), $cont = $("#info-legal").parent("div");
            if ($self.parent("div").hasClass("open")) {
                $cont.animate({
                    scrollTop: 38 * $selfPosition
                }, 300);
            } else {
                $cont.animate({
                    scrollTop: 0
                }, 300);
            }
            setTimeout(function() {
                $tabsScrollbar.perfectScrollbar("update");
            }, 400);
        });
    };
    return module;
}();

RogerVivier.components.zoom = function() {
    "use strict";
    var module = {};
    $.fn.zoomAniamation = function($zoom, $self, $thumb) {
        $zoom.toggleClass("zoom-active");
        $self.toggleClass("btn-close");
        $thumb.toggleClass("thumb-active");
        $(".product-img-hero-zoom > div").slick("setPosition");
        $(".thumb").slick("setPosition");
    };
    $.fn.zoomClose = function($zoom) {
        $zoom.toggleClass("active-zoom");
    };
    module.activeZoom = function() {
        $(".btn-zoom").on("click", function(event) {
            event.preventDefault();
            var $zoom = $(".product-img-hero-zoom"), $self = $(this), $thumb = $(".thumb");
            if ($self.hasClass("btn-close")) {
                $self.zoomAniamation($zoom, $self, $thumb);
                setTimeout(function() {
                    $zoom.zoomClose($zoom);
                }, 300);
            } else {
                $zoom.zoomClose($zoom);
                setTimeout(function() {
                    $self.zoomAniamation($zoom, $self, $thumb);
                }, 10);
            }
        });
    };
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.productDetails = function() {
    "use strict";
    var module = {};
    module.init = function() {
        init_pluginSlick();
        init_infoProduct();
        RogerVivier.components.select.initSelect();
        RogerVivier.components.product.init();
    };
    var init_infoProduct = function() {
        var $tabsClick = $(".tabs-component .navigation li a");
        var $tabsScrollbar = $(".tabs-component > div");
        RogerVivier.components.tabs.activeTabs($tabsClick, $tabsScrollbar);
    };
    var init_pluginSlick = function() {
        var $carouselImage = $(".product-img-hero > div, .product-img-hero-zoom > div"), $carouselThumb = $(".thumb"), $carouselLike = $(".you-may-also-like .carousel");
        if (RogerVivier.utility.isElementExist($carouselImage.find("img"))) {
            $carouselImage.slick({
                lazyLoad: "ondemand",
                dots: false,
                infinite: false,
                speed: 500,
                centerMode: true,
                focusOnSelect: true,
                asNavFor: $carouselThumb,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                adaptiveHeight: true,
                responsive: [ {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        fade: false,
                        dots: true
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        speed: 300,
                        fade: false,
                        dots: true
                    }
                } ]
            });
            $carouselImage.on("swipe", function(event, slick, direction) {
                var ind = $(this).find(".slick-current").index();
                $carouselThumb.find(".slick-slide").removeClass("slick-active slick-current");
                $carouselThumb.find(".slick-slide").eq(ind).addClass("slick-active slick-current");
            });
        }
        if (RogerVivier.utility.isElementExist($carouselThumb.find("img"))) {
            $carouselThumb.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
                asNavFor: $carouselImage,
                dots: false,
                focusOnSelect: true,
                vertical: true
            });
        }
        if (RogerVivier.utility.isElementExist($carouselLike.find("img"))) {
            $carouselLike.slick({
                lazyLoad: "ondemand",
                autoplay: true,
                autoplaySpeed: 2e3,
                infinite: true,
                speed: 500,
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [ {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                } ]
            });
        }
        RogerVivier.components.zoom.activeZoom();
    };
    $("[data-remodal-id=size-modal]").remodal({
        hashTracking: false
    });
    return module;
}();

$(document).ready(function() {
    RogerVivier.productDetails.init();
});

var RogerVivier = RogerVivier || {};

RogerVivier.contactTemplate = RogerVivier.legalTemplate || {};

RogerVivier.contactTemplate.behavior = function() {
    "use strict";
    var module = {}, $tabsScrollbar = $(".contattaci-scroll > div");
    $tabsScrollbar.perfectScrollbar();
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.costumerServiceTemplate = RogerVivier.costumerServiceTemplate || {};

RogerVivier.costumerServiceTemplate.behavior = function() {
    "use strict";
    var module = {};
    module.collapseNavigation = function() {
        $(".option-fake-cservice a").on("click tap", function() {
            var $this = $(this);
            if ($(".navigation-cservice-page ul").hasClass("collapseOpen")) {
                $this.parents("ul").removeClass("collapseOpen");
                return;
            }
            $this.parents("ul").addClass("collapseOpen");
        });
        $(".option-fake-cservice div").on("click tap", function() {
            var $this = $(this);
            if ($(".content-navigation-cservice-page ul").hasClass("collapseOpen")) {
                $this.parents("ul").removeClass("collapseOpen");
                return;
            }
            $this.parents("ul").addClass("collapseOpen");
        });
        $(".content-navigation-cservice-page .item-menu div").on("click tap", function() {
            var $thisLi = $(this).parent(".item-menu"), $this = $(this);
            var textAnchor = $this.text();
            $(".content-navigation-cservice-page li").removeClass("selectedBlock");
            $thisLi.addClass("selectedBlock");
            $(".option-fake-cservice div").text(textAnchor);
            $thisLi.parents("ul").removeClass("collapseOpen");
        });
    };
    module.tabNavigation = function() {
        $(".tab-cservice").on("click tap", function() {
            var $this = $(this), current = $this.index(), $items = $(".mod-item");
            $(".tab-cservice").removeClass("active");
            $(".tab-cservice").eq(current).addClass("active");
            $items.removeClass("current");
            $items.eq(current).addClass("current");
        });
        $(".item-menu").on("click tap", function() {
            var $this = $(this), current = $this.index(), $items = $(".mod-item");
            $items.removeClass("current");
            $items.eq(current - 1).addClass("current");
        });
    };
    $(function() {
        module.collapseNavigation();
        module.tabNavigation();
    });
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.iconsTemplate = RogerVivier.iconsTemplate || {};

RogerVivier.iconsTemplate.behavior = function() {
    "use strict";
    var module = {}, $header = $("header"), $breadcrumb = $(".breadcrumb"), $introIconsPage = $(".intro-icons"), $contentClassIcons = $(".icons-template-content"), heightNavigationBar = $header.outerHeight() + $breadcrumb.outerHeight() + $introIconsPage.outerHeight(), $navigationIconPage = $(".navigation-icon-page"), $navigationIconPageHeight = $(".navigation-icon-page").outerHeight(), $linksNavigationBar = $(".navigation-icon-page ul li a"), $linksNavigationBarLi = $(".navigation-icon-page ul li"), $firstLinkNavigationBarLi = $(".navigation-icon-page ul li:first-child a"), $blockTemplateIcons = $(".block-template-icons");
    var navigationsSection = function($section, $voice, scroll) {
        var countSection = $section.length, lastSectionHeight = $section.eq(countSection - 1).outerHeight(), bounds = [ $section.eq(0).position().top - $navigationIconPageHeight - 1, $section.eq(countSection - 1).position().top + lastSectionHeight - $navigationIconPageHeight - 1 ];
        if (scroll >= bounds[0] && scroll <= bounds[1]) {
            for (var i = 0; i < countSection; i++) {
                var sectionPos = $section.eq(i).position().top;
                if (scroll + $navigationIconPageHeight + 1 >= sectionPos) {
                    $voice.removeClass("selected");
                    $voice.eq(i + 1).addClass("selected");
                }
            }
        } else {
            $voice.removeClass("selected");
        }
    };
    module.stickyNavigation = function() {
        var scroll = $(window).scrollTop();
        if (scroll > heightNavigationBar) {
            $contentClassIcons.addClass("navigationSticky");
        } else {
            $contentClassIcons.removeClass("navigationSticky");
        }
    };
    module.collapseNaviagtion = function() {
        $(".option-fake a").on("click tap", function() {
            var $thisLi = $(this).parent(), $this = $(this);
            if ($(".navigation-icon-page ul").hasClass("collapseOpen")) {
                $this.parents("ul").removeClass("collapseOpen");
                return;
            }
            $this.parents("ul").addClass("collapseOpen");
        });
        $(".navigation-icon-page .item-menu a").on("click tap", function() {
            var $thisLi = $(this).parent(".item-menu"), $this = $(this);
            var textAnchor = $this.text();
            $(".navigation-icon-page li").removeClass("selectedBlock");
            $thisLi.addClass("selectedBlock");
            $(".option-fake a").text(textAnchor);
            $thisLi.parents("ul").removeClass("collapseOpen");
            var idBlock = $this.attr("href");
            $blockTemplateIcons.removeClass("blockIconsVisible");
            var $selectedBlock = $("section" + idBlock).addClass("blockIconsVisible");
            $(".carousel-images-icons").slick("setPosition");
        });
    };
    module.effectScrollAnchor = function() {
        $linksNavigationBar.on("click tap", function() {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    setTimeout(function() {
                        $("html, body").animate({
                            scrollTop: target.offset().top - $navigationIconPageHeight
                        }, 350);
                    }, 50);
                    return false;
                }
            }
        });
    };
    module.initSlickIconsPage = function() {
        $(".carousel-images-icons").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            dots: true,
            focusOnSelect: true
        });
    };
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        module.stickyNavigation();
        if ($contentClassIcons.length !== 0) {
            navigationsSection($blockTemplateIcons, $(".navigation-icon-page ul li"), scroll);
        }
    });
    $(function() {
        module.collapseNaviagtion();
        module.stickyNavigation();
        module.effectScrollAnchor();
        module.initSlickIconsPage();
        if ($contentClassIcons.length !== 0) {
            navigationsSection($blockTemplateIcons, $(".navigation-icon-page ul li"), scroll);
        }
    });
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.legalTemplate = RogerVivier.legalTemplate || {};

RogerVivier.legalTemplate.behavior = function() {
    "use strict";
    var module = {};
    module.collapseNaviagtion = function() {
        $(".option-fake-legal a").on("click tap", function() {
            var $thisLi = $(this).parent(), $this = $(this);
            if ($(".navigation-legal-page ul").hasClass("collapseOpen")) {
                $this.parents("ul").removeClass("collapseOpen");
                return;
            }
            $this.parents("ul").addClass("collapseOpen");
        });
    };
    $(function() {
        module.collapseNaviagtion();
    });
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.myaccountTemplate = RogerVivier.myaccountTemplate || {};

RogerVivier.myaccountTemplate.behavior = function() {
    "use strict";
    var module = {}, $sectionProfileDetails = $(".content-custom section"), $contentSlotBox = $(".contentSlotBox"), $singleSlotBox = $(".contentSlotBox .slotBox");
    module.collapseBreadcrumb = function() {
        $(".option-fake-myaccount a").on("click tap", function() {
            var $thisLi = $(this).parent(), $this = $(this);
            if ($(".container-breadcrumb-myaccount ul").hasClass("breadcrumbOpen")) {
                $this.parents("ul").removeClass("breadcrumbOpen");
                return;
            }
            $this.parents("ul").addClass("breadcrumbOpen");
        });
        $(".breadcrumb-myaccount .item-navigation a").on("click tap", function() {
            var $thisLi = $(this).parent(".item-navigation"), $this = $(this);
            var textAnchor = $this.text();
            $(".breadcrumb-myaccount li").removeClass("item-active");
            $thisLi.addClass("tem-active");
            $(".option-fake-myaccount a").text(textAnchor);
            $thisLi.parents("ul").removeClass("breadcrumbOpen");
        });
    };
    module.deatilsProfile = function() {
        $(".modify-myaccount").on("click tap", function() {
            var $thisData = $(this).data("openwindow"), $this = $(this);
            $sectionProfileDetails.addClass("my-account-hidden");
            setTimeout(function() {
                $(".content-custom ." + $thisData).addClass("my-account-block");
                $sectionProfileDetails.addClass("my-account-none");
            }, 340);
            setTimeout(function() {
                $(".content-custom ." + $thisData).addClass("my-account-visible");
            }, 440);
        });
        $(".window-custom .icon-closedicon, .window-custom .cont-button button[type='button']").on("click tap", function() {
            $(".window-custom").removeClass("my-account-visible");
            setTimeout(function() {
                $(".window-custom").removeClass("my-account-block");
                $sectionProfileDetails.removeClass("my-account-none");
            }, 340);
            setTimeout(function() {
                $sectionProfileDetails.removeClass("my-account-hidden");
            }, 440);
        });
    };
    module.behaviorSlot = function() {
        if ($contentSlotBox.length >= 1) {
            if ($singleSlotBox.length == 1) {
                $singleSlotBox.addClass("centerElementSingleBox");
            }
        }
    };
    $(function() {
        module.collapseBreadcrumb();
        module.deatilsProfile();
        module.behaviorSlot();
    });
    return module;
}();

RogerVivier.thankYou = function() {
    "use strict";
    var module = {};
    module.init = function() {
        init_pluginSlick();
    };
    var init_pluginSlick = function() {
        var $carouselLike = $(".ty-carousel .carousel");
        if (RogerVivier.utility.isElementExist($carouselLike.find("img"))) {
            $carouselLike.slick({
                lazyLoad: "ondemand",
                autoplaySpeed: 2e3,
                infinite: true,
                speed: 500,
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 1
            });
        }
    };
    return module;
}();

$(document).ready(function() {
    RogerVivier.thankYou.init();
});

var RogerVivier = RogerVivier || {};

RogerVivier.page = RogerVivier.page || {};

RogerVivier.page.socialwall = function() {
    "use strict";
    var module = {}, $modal = $('[data-remodal-id="modal"]'), $modalContainer = $(".description-container", $modal);
    $(window).on("load", function() {
        $("#socialgrid").babylongrid({
            scheme: [ {
                minWidth: 1024,
                columns: 3
            }, {
                minWidth: 768,
                columns: 2
            }, {
                minWidth: 0,
                columns: 1
            } ]
        });
    });
    $("article .more").on("click", function() {
        var $this = $(this), $article = $this.closest("article"), $img = $(".media-container img", $article).clone(), $modalContent = $(".modal-container-hidden", $article).clone();
        $(".media-container", $modal).html($img);
        $modalContainer.html($modalContent);
    });
    $("[data-remodal-id=modal]").remodal({
        hashTracking: false
    });
    return module;
}();

var RogerVivier = RogerVivier || {};

RogerVivier.storLocatoreTemplate = RogerVivier.storLocatoreTemplate || {};

RogerVivier.storLocatoreTemplate.behavior = function() {
    "use strict";
    var module = {}, $buttonListBoutique = $(".list-all-store"), $buttonMapView = $(".map-view"), $containerStoreLocator = $(".navigation-storelocator, .map-container, .mobile-image-storelocator, .intro-storelocator"), $buttonPlusDetails = $(".button-more-details"), $buttonBackMap = $(".back-details"), $listStoresLink = $(".list-stores li a");
    module.listBoutiques = function() {
        $buttonListBoutique.on("click tap", function() {
            $containerStoreLocator.addClass("openListBoutique");
        });
    };
    module.backMenuView = function() {
        $buttonBackMap.on("click tap", function() {
            $containerStoreLocator.removeClass("openDetailsBoutique");
        });
    };
    module.openMapView = function() {
        $buttonMapView.on("click tap", function() {
            $containerStoreLocator.removeClass("openListBoutique");
        });
    };
    module.windowBoutiqueList = function() {
        $listStoresLink.on("click tap", function() {
            $containerStoreLocator.addClass("openDetailsBoutique");
            initgMapsStore(40.719552, -74.002142);
            $("html, body").animate({
                scrollTop: "0"
            });
        });
    };
    $(".carosuel-boutique").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1
    });
    $(function() {
        $(".list-stores").perfectScrollbar();
        module.listBoutiques();
        module.openMapView();
        module.backMenuView();
        module.windowBoutiqueList();
    });
    return module;
}();

if ($(".map-container").length != 0) {
    function initgMapsStore(coordinatesLat, coordinatesLong) {
        var countriesMarkers = [];
        var storesMarker = [];
        var defaultZoom = 12;
        var cityZoom = 14;
        var latlng = new google.maps.LatLng(coordinatesLat, coordinatesLong);
        var mapCanvas = document.getElementById("canvasDetails");
        var styles = [ {
            featureType: "all",
            elementType: "all",
            stylers: [ {
                hue: "#f9f0f2"
            }, {
                saturation: -80
            } ]
        } ];
        var options = {
            disableDefaultUI: true,
            panControl: true,
            zoomControl: true,
            scrollwheel: false,
            zoom: defaultZoom,
            minZoom: 3,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styles
        };
        var map = new google.maps.Map(mapCanvas, options);
        var pin = "assets/img/pin.png";
        var marker = new google.maps.Marker({
            position: {
                lat: coordinatesLat,
                lng: coordinatesLong
            },
            map: map,
            icon: pin,
            flat: true
        });
        countriesMarkers.push(marker);
        $(".carosuel-boutique").slick("setPosition");
        function resizeMap() {
            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
        }
        var resizedMap = new resizeMap();
    }
    var gMaps = function() {
        var countriesMarkers = [];
        var storesMarker = [];
        var defaultZoom = 8;
        var cityZoom = 14;
        var latlng = new google.maps.LatLng(45.4056319, 12.2416609);
        var mapCanvas = document.getElementById("mapCanvas");
        var styles = [ {
            featureType: "all",
            elementType: "all",
            stylers: [ {
                hue: "#f9f0f2"
            }, {
                saturation: -80
            } ]
        } ];
        var options = {
            disableDefaultUI: true,
            panControl: true,
            zoomControl: true,
            scrollwheel: false,
            zoom: defaultZoom,
            minZoom: 3,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styles
        };
        var map = new google.maps.Map(mapCanvas, options);
        var pin = "assets/img/pin.png";
        var marker = new google.maps.Marker({
            position: {
                lat: 45.4056319,
                lng: 12.2416609
            },
            map: map,
            icon: pin,
            flat: true
        });
        countriesMarkers.push(marker);
        var markerClick = google.maps.event.addListener(marker, "click", function() {
            map.setCenter(marker.getPosition());
            var infoDetails = '<div class="infobox-store-map">' + '<div class="principal-image">' + '<img src="assets/img/store_example.jpg">' + '<a href="javascript:void(0)" class="button-more-details"></a>' + "</div>" + '<div class="links">' + '<a src="javascript:void(0);"><i class="icon-returns"></i>DIRECTIONS</a>' + '<a src="javascript:void(0);"><i class="icon-share"></i>SHARE</a>' + "</div>" + '<div class="text">' + '<p class="title">paris le bon marché</p>' + '<p class="address">24 Rue de Sèvres, 75007 Paris, France</p>' + '<p class="phone"><b>T.</b> +33 1 45487119</p>' + '<p class="mail"><b>M.</b>  rvparisbonmarche@rogervivier.com</p>' + '<p class="hours"><b>opening hours:</b> Mon-sat - 10am to 8pm</p>' + "</div>" + "</div>";
            infowindow = new google.maps.InfoWindow({
                content: infoDetails,
                maxWidth: 342
            });
            google.maps.event.addListener(infowindow, "domready", function() {
                var iwOuter = $(".gm-style-iw");
                var iwBackground = iwOuter.prev();
                var iwCloseBtn = iwOuter.next();
                iwCloseBtn.css({
                    opacity: "1",
                    right: "53px",
                    top: "15px",
                    height: "18px",
                    width: "18px"
                });
                iwCloseBtn.mouseout(function() {
                    $(this).css({
                        opacity: "1"
                    });
                });
                $(".gm-style-iw > div > div").css("overflow", "hidden");
                $('img[src="http://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png"]').attr("width", 16).attr("height", 16).css({
                    width: "18px",
                    height: "18px",
                    top: "0px",
                    left: "0px"
                }).attr("src", "assets/img/closemaps.png");
                iwBackground.children(":nth-child(2)").css({
                    display: "none"
                });
                iwBackground.children(":nth-child(4)").css({
                    display: "none"
                });
                iwBackground.children(":nth-child(3)").find("div").children().css({
                    "z-index": "1"
                });
                $(".button-more-details").on("click tap", function() {
                    if ($(".navigation-storelocator, .map-container").hasClass("openDetailsBoutique")) {
                        $(".navigation-storelocator, .map-container").removeClass("openDetailsBoutique");
                        return;
                    }
                    $(".navigation-storelocator, .map-container").addClass("openDetailsBoutique");
                    initgMapsStore(45.4056319, 12.2416609);
                });
            });
            infowindow.open(map, marker);
        });
        function resizeMap() {
            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
        }
        var resizedMap = new resizeMap();
    }();
    window.onload = gMaps;
}

var RogerVivier = RogerVivier || {};

RogerVivier.validatorIstutional = RogerVivier.validatorIstutional || {};

RogerVivier.validatorIstutional.behavior = function() {
    "use strict";
    var module = {};
    module.validatorForm = function() {
        $("form.form-istutional *[type=submit]").on("click tap", function(e) {
            e.preventDefault();
            var $obligationInput = $("form.form-istutional").find("div.required input , div.required textarea"), $obligationSelect = $("form.form-istutional").find("div.required select"), $obligationInteger = $("form.form-istutional").find('.cont-form[data-phone="true"] input'), $obligationCheckbox = $("form.form-istutional").find('.cont-checkbox[data-checkrequired="true"] input[type="checkbox"]'), $obligationEmail = $("form.form-istutional").find('.cont-form[data-email="true"] input');
            $(".cont-form .error").hide();
            $(".cont-form , .cont-checkbox").removeClass("error");
            function validateEmail(email) {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return re.test(email);
            }
            $($obligationInput).each(function(index) {
                if ($(this).val() == "") {
                    $(this).parents(".cont-form").addClass("error");
                    $(this).parents(".cont-form").find(".error").show();
                }
            });
            $($obligationSelect).each(function() {
                if ($(this).val() == "" || $(this).val() == null) {
                    $(this).parents(".cont-form").addClass("error");
                    $(this).parents(".cont-form").find(".error").show();
                }
            });
            $($obligationInteger).each(function() {
                if ($(this).val() != "" && !$.isNumeric($(this).val())) {
                    $(this).parents(".cont-form").addClass("error");
                    $(this).parents(".cont-form").find(".error").show();
                }
            });
            $($obligationEmail).each(function() {
                if (!validateEmail($(this).val())) {
                    $(this).parents(".cont-form").addClass("error");
                    $(this).parents(".cont-form").find(".error").show();
                }
            });
            $($obligationCheckbox).each(function() {
                if (!$(this).is(":checked")) {
                    $(this).parents(".cont-checkbox").addClass("error");
                }
            });
            if ($(".cont-form , .cont-checkbox").hasClass("error")) {
                var firstelementError = $(".cont-form.error , .cont-checkbox.error").first();
                var coordinateX = firstelementError.offset();
                var coordinateXtot = coordinateX.top - firstelementError.height();
                $("html, body").animate({
                    scrollTop: coordinateXtot
                });
            } else {
                $("form.form-istutional").submit();
            }
        });
    };
    $(function() {
        $(".cont-form .error").hide();
        module.validatorForm();
    });
    return module;
}();