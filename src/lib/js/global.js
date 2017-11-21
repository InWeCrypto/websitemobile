const util = {
	setViewFontSize() {
		var docEl = document.documentElement,
			resizeEvt =
				"orientationchange" in window ? "orientationchange" : "resize",
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				if (clientWidth > 750) clientWidth = 750;
				docEl.style.fontSize = 100 * (clientWidth / 350) + "px";
			};
		if (!document.addEventListener) return;
		window.addEventListener(resizeEvt, recalc, false);
		document.addEventListener("DOMContentLoaded", recalc, false);
	}
};
(function(window, document) {
	util.setViewFontSize();
})(window, document);
