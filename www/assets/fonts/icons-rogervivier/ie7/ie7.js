/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icons-rogervivier\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-quotes-left': '&#xe932;',
		'icon-eye': '&#xe931;',
		'icon-database': '&#xe92f;',
		'icon-save': '&#xe930;',
		'icon-cog': '&#xe92e;',
		'icon-bubble': '&#xe929;',
		'icon-alert': '&#xe92a;',
		'icon-delete2': '&#xe92b;',
		'icon-mail': '&#xe92c;',
		'icon-orders': '&#xe92d;',
		'icon-rogervivier-paris': '&#xe927;',
		'icon-googleplus': '&#xe90d;',
		'icon-toolfreenumber': '&#xe91f;',
		'icon-contactus': '&#xe906;',
		'icon-myprofile': '&#xe915;',
		'icon-ordersummary': '&#xe916;',
		'icon-search': '&#xe91c;',
		'icon-wishlist': '&#xe922;',
		'icon-arrow': '&#xe902;',
		'icon-arrow-left': '&#xe924;',
		'icon-arrow-right': '&#xe925;',
		'icon-arrow-top': '&#xe926;',
		'icon-delivery': '&#xe908;',
		'icon-rightofwithdrawal': '&#xe91b;',
		'icon-address': '&#xe900;',
		'icon-arrowtoleft': '&#xe928;',
		'icon-arrowtoright': '&#xe901;',
		'icon-bookacallback': '&#xe903;',
		'icon-chatwithassistant': '&#xe904;',
		'icon-closedicon': '&#xe905;',
		'icon-cookiepolicy': '&#xe907;',
		'icon-edit': '&#xe909;',
		'icon-facebook': '&#xe90a;',
		'icon-faq': '&#xe90b;',
		'icon-gift': '&#xe90c;',
		'icon-howtocheck': '&#xe90e;',
		'icon-infoprivacy': '&#xe90f;',
		'icon-instagram': '&#xe910;',
		'icon-legalnotes': '&#xe911;',
		'icon-less': '&#xe912;',
		'icon-menumobile': '&#xe913;',
		'icon-more': '&#xe914;',
		'icon-paymentmethod': '&#xe917;',
		'icon-pinterest': '&#xe918;',
		'icon-requestacallback': '&#xe919;',
		'icon-returns': '&#xe91a;',
		'icon-share': '&#xe91d;',
		'icon-sign-out': '&#xe91e;',
		'icon-twitter': '&#xe920;',
		'icon-weibo': '&#xe921;',
		'icon-youtube': '&#xe923;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
