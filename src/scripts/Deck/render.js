var hg = require('mercury');
var h = require('mercury').h;
var Slide = require('./Slide');

module.exports = render;

function render(state) {
    // var theme = state.theme ? state.theme : 'basic';
    var theme = state.theme ? state.theme : 'fader';

    return h('div.Deck.Deck--theme-' + theme, state.isSettingsVisible ?
        [null] :
        state.slides.map(function (slide, index) {
            return Slide.render(slide, index === state.activeIndex);
        })
    );
}
