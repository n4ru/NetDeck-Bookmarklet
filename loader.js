// Actual Bookmarklet code:
// javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='https://secure.bluehost.com/~nfourui1/netdeck/bookmarklet/loader.js?'+Math.random();}());

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
	"https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
	"https://secure.bluehost.com/~nfourui1/netdeck/bookmarklet/cards.js",
	"https://secure.bluehost.com/~nfourui1/netdeck/functions.php",
	"https://secure.bluehost.com/~nfourui1/netdeck/bookmarklet/ZeroClipboard.js",
	"https://secure.bluehost.com/~nfourui1/netdeck/bookmarklet/bPopup.js",
	"https://secure.bluehost.com/~nfourui1/netdeck/bookmarklet/bDeck.js"
], function() {
	bDeck();
});