var hg = require('mercury');
var Slide = require('./Slide');

require('../scaled')('.Deck', 720, 480);

module.exports = Deck;

function Deck(slides) {
    var state = hg.state({
        activeIndex: hg.value(0),
        slides: hg.array(slides.map(Slide)),
        isSettingsVisible: hg.value(false)
    });

    document.documentElement.addEventListener('keydown', keyboard.bind(null, state));

    return state;
}

Deck.render = require('./render');

function keyboard(state, ev) {
    if (state.isSettingsVisible() && ev.keyCode !== 27) {
        return;
    }

    switch (ev.keyCode) {
        case 27:
            toggleSettingsVisibility(state);
            break;
        case 37:
        case 188:
            backward(state);
            break;
        case 13:
        case 32:
        case 39:
            forward(state);
            break;
        default:
            break;
    }
}

function toggleSettingsVisibility(state) {
    state.isSettingsVisible.set(!state.isSettingsVisible());
}

function go(state, index) {
    if (index !== state.activeIndex() && index > -1 && index < state.slides().length) {
        state.activeIndex.set(index);
    }
}

function backward(state) {
    go(state, state.activeIndex() - 1);
}

function forward(state) {
    go(state, state.activeIndex() + 1);
}


