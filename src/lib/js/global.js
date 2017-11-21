const util = {
	setViewFontSize() {
		var docEl = document.documentElement,
			resizeEvt =
				"orientationchange" in window ? "orientationchange" : "resize",
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				if (clientWidth > 750) clientWidth = 750; //这里限制最大的宽度尺寸，从而实现PC端的两边留白等
				docEl.style.fontSize = 100 * (clientWidth / 350) + "px";
			};
		console.log(resizeEvt);
		if (!document.addEventListener) return;
		window.addEventListener(resizeEvt, recalc, false);
		document.addEventListener("DOMContentLoaded", recalc, false);
	}
};
(function(window, document) {
	util.setViewFontSize();
})(window, document);
