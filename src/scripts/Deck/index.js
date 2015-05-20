var hg = require('mercury');
var nav = require('./nav');
var Slide = require('./Slide');
var THEMES = require('./themes');

require('../scaled')('.Deck', 720, 480);

module.exports = Deck;

function Deck(slides) {
    var state = hg.state({
        slides: hg.array(slides.map(Slide)),
        activeIndex: hg.value(0),
        isSettingsVisible: hg.value(false),
        isLogVisible: hg.value(true),
        theme: hg.value(THEMES[0]),
        channels: {
            updateLogVisibility: updateLogVisibility,
            updateTheme: updateTheme
        }
    });

    nav(state);

    return state;
}

Deck.render = require('./render');

function updateLogVisibility(state, data) {
    state.isLogVisible.set(data.isLogVisible);
}

function updateTheme(state, data) {
    state.theme.set(data.theme);
}
