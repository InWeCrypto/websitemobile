(function(window, document) {
	const setViewFontSize = () => {
		var doc = document;
		var win = window;
		var docEl = doc.documentElement,
			resizeEvt =
				"orientationchange" in window ? "orientationchange" : "resize",
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				if (clientWidth > 750) clientWidth = 750; //这里限制最大的宽度尺寸，从而实现PC端的两边留白等
				docEl.style.fontSize = 100 * (clientWidth / 320) + "px";
			};
		console.log(resizeEvt);
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener("DOMContentLoaded", recalc, false);
	};
	window.util = {
		setViewFontSize: setViewFontSize
	};
})(window, document);
