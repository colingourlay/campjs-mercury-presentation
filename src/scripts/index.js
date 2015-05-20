var domready = require('domready');
var hg = require('mercury');

var Deck = require('./Deck');
var slides = require('./slides/index');

domready(function () {
    var state = Deck(slides);

    state(function (value) {
        console.log(value._diff);
    });

    hg.app(document.body, state, Deck.render);
});
