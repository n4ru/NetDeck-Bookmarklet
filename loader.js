// Actual Bookmarklet code:
// javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='//netdeck.n4ru.it/bookmarklet/loader.js?'+Math.random();}());

function loadScripts(array, callback) {
	var loader = function(src, handler) {
		var script = document.createElement("script");
		script.src = src;
		script.onload = script.onreadystatechange = function() {
			script.onreadystatechange = script.onload = null;
			handler();
		}
		var head = document.getElementsByTagName("head")[0];
		(head || document.body).appendChild(script);
	};
	(function() {
		if (array.length != 0) {
			loader(array.shift(), arguments.callee);
		} else {
			callback && callback();
		}
	})();
}

loadScripts([
	"//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
	"//netdeck.n4ru.it/bookmarklet/cards_1.js",
	"//netdeck.n4ru.it/bookmarklet/cards_2.js",
	"//netdeck.n4ru.it/bookmarklet/cards_3.js",
	"//netdeck.n4ru.it/bookmarklet/cards_4.js",
	"//netdeck.n4ru.it/functions.php",
	"//netdeck.n4ru.it/bookmarklet/ZeroClipboard.js",
	"//netdeck.n4ru.it/bookmarklet/bPopup.js",
	"//netdeck.n4ru.it/bookmarklet/bDeck.js"
], function() {
	bDeck();
});