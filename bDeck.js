deckx = false;
arena = false;

var deck = {
	addCards: function(elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
			if (values) {
				quantity = $(elemthree, this).text().trim().match(/(\d+)(?!.*\d)/g, '$1');
				self.list.push(values);
				for (var j = 1; j < quantity[quantity.length - 1]; j++) {
					self.list.push(values);
				}
			}
		});
	},
	copy: function(pref) {
		this.list = [];
		this.list.unshift("url:" + window.location.href);
		this.list.unshift("arena:" + arena);
		this.list.unshift("name:" + deck.name.trim());
		this.list.unshift("trackerimport");
		update();
		prompt("Copy to Clipboard to Import: (Cmd+C or Ctrl+C)", this.list.join("\r\n"));
	}
};

function getCardName(cardid) {
	for (var z = 0; z < Object.keys(cards_data).length; z++) {
		for (var i = 0; i < cards_data[Object.keys(cards_data)[z]].length; i++) {
			if (cards_data[Object.keys(cards_data)[z]][i].id == cardid) {
				return cards_data[Object.keys(cards_data)[z]][i].name;
			}

		}
	}
};

function bDeck() {
	Object.keys(siteFunctions).forEach(function(site) {
		if (window.location.href.indexOf(site) >= 0) {
			deckx = true;
			siteFunctions[site]();
		}
	});
	if (deckx) {
		deck.copy();
	} else {
		alert('Site not supported or deck not found.');
	}
}