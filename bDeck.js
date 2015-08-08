deckx = false;
arena = false;
var deck = {
    addCards: function(elemone, elemtwo, elemthree, lang) {
        var self = this;
        $(elemone).each(function(i, el) {
            if (lang) {
                var values = getCardName($(elemtwo, this).text(), 'name', lang);
            } else {
                var values = $(elemtwo, this).text();
            }
            if (values) {
                quantity = $(elemthree, this).text().trim().match(/(\d+)(?!.*\d)/g, '$1');
                self.list.push(values);
                if (quantity) {
                    for (var j = 1; j < quantity[quantity.length - 1]; j++) {
                        self.list.push(values);
                    }
                }
            }
        });
    },
    copy: function(pref) {
        this.list = [];
        update();
        this.list.unshift("url:" + window.location.href);
        this.list.unshift("arena:" + arena);
        this.list.unshift("name:" + deck.name.trim());
        this.list.unshift("trackerimport");
        $('#test').bPopup().close();
        $('#test').remove();
        $("body").append("<div id='test' style='position: fixed; opacity: 1; left: 50%; top: 50%;'><img src='//netdeck.n4ru.it/bookmarklet/export.png'></div>");
        $('#test').bPopup();
        ZeroClipboard.config({
            swfPath: '//netdeck.n4ru.it/bookmarklet/ZeroClipboard.swf',
            forceHandCursor: true,
            trustedDomains: [window.location.href]
        });
        var client = new ZeroClipboard($("#test img"));
        client.on('copy', function(event) {
            event.clipboardData.setData('text/plain', deck.list.join("\r\n"));
            $('#test').bPopup().close();
        });
    }
};

function langFix(card) {
    return card
        .replace(/Â|À|Å|Ã/g, "A")
        .replace(/â|à|å|ã/g, "a")
        .replace(/Ä/g, "AE")
        .replace(/ä/g, "ae")
        .replace(/Ç/g, "C")
        .replace(/ç/g, "c")
        .replace(/É|Ê|È|Ë/g, "E")
        .replace(/é|ê|è|ë/g, "e")
        .replace(/Ó|Ô|Ò|Õ|Ø/g, "O")
        .replace(/ó|ô|ò|õ/g, "o")
        .replace(/Ö/g, "OE")
        .replace(/ö/g, "oe")
        .replace(/Š/g, "S")
        .replace(/š/g, "s")
        .replace(/ß/g, "ss")
        .replace(/Ú|Û|Ù/g, "U")
        .replace(/ú|û|ù/g, "u")
        .replace(/Ü/g, "UE")
        .replace(/ü/g, "ue")
        .replace(/Ý|Ÿ/g, "Y")
        .replace(/ý|ÿ/g, "y")
        .replace(/Ž/g, "Z")
        .replace(/ž/, "z")
        .replace(/[\s\`\"\'\’\xA0]/g)
        .toLowerCase();
}

function getCardName(reference, type, lang) {
    for (var z = 0; z < Object.keys(cards_data[lang]).length; z++) {
        for (var i = 0; i < cards_data[lang][Object.keys(cards_data[lang])[z]].length; i++) {
            thisCard = cards_data[lang][Object.keys(cards_data[lang])[z]][i][type];
            if (langFix(thisCard) == langFix(reference)) {
                if (type == 'id') {
                    return cards_data['enUS'][Object.keys(cards_data[lang])[z]][i].name;
                }
                return getCardName(cards_data[lang][Object.keys(cards_data[lang])[z]][i].id, 'id', 'enUS');
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
    for (i = 0; i < unsupported.length; i++) {
        if (window.location.href.indexOf(unsupported[i]) >= 0) {
            deckx = true;
            deck.copy = function() {};
            deck.download = function() {};
            alert("Not supported.");
            return false;
        }
    };
    if (deckx) {
        deck.copy();
    } else {
        if (confirm('Site not supported or deck not found.\nWould you like to vote for support?')) {
            $.get("https://netdeck.n4ru.it/vote.php?site=" + window.location.href.replace(/https*:\/\//, ""));
        }
    }
}