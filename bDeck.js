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
        $('#test').each(function() {
            $(this).remove();
        });
        $('#global-zeroclipboard-html-bridge').each(function() {
            $(this).remove();
        });
        $("body").append("<div id='test' style='display: block; position: fixed; opacity: 1; left: 50%; top: 50%;'><img src='//netdeck.n4ru.it/bookmarklet/export.png'></div>")
        $('#test').bPopup();
        ZeroClipboard.config({
            swfPath: '//netdeck.n4ru.it/bookmarklet/ZeroClipboard.swf',
            forceHandCursor: true,
            trustedDomains: [window.location.host, "netdeck.n4ru.it"]
        });
        var client = new ZeroClipboard($("#test img"));
        client.on('copy', function(event) {
            event.clipboardData.setData('text/plain', deck.list.join("\r\n"));
            $('#test').bPopup().close();
        });
    }
};

function getCardName(reference, type, lang) {
    for (var z = 0; z < Object.keys(cards_data[lang]).length; z++) {
        for (var i = 0; i < cards_data[lang][Object.keys(cards_data[lang])[z]].length; i++) {
            if (cards_data[lang][Object.keys(cards_data[lang])[z]][i][type].replace(/[\s\`\"\'\’\xA0]/g, "") == reference.replace(/[\s\`\"\'\’\xA0]/g, "")) {
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
    if (deckx) {
        deck.copy();
    } else {
        if (confirm('Site not supported or deck not found.\nWould you like to vote for support?')) {
            $.get("https://netdeck.n4ru.it/vote.php?site=" + window.location.href.replace(/https*:\/\//, ""));
        }
    }
}