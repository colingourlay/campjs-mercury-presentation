var hg = require('mercury');
var h = require('mercury').h;
var Slide = require('./Slide');
var THEMES = require('./themes');

module.exports = render;

function render(state) {
    return h('div.Deck.Deck--theme-' + state.theme,
        state.slides.map(function (slide, index) {
            var isSlideActive = index === state.activeIndex;
            return Slide.render(slide, isSlideActive, state.isLogVisible);
        }).concat([state.isSettingsVisible ?
            hg.partial(renderSettings, state, state.channels) :
            null
        ])
    );
}

function renderSettings(state, channels) {
    return h('div.Deck-settings', [
        h('h3', 'Settings'),
        h('div.Deck-settingsField', [
            h('label', 'Show demo logs?'),
            h('input', {
                type: 'checkbox',
                name: 'isLogVisible',
                checked: state.isLogVisible,
                'ev-change': hg.sendValue(channels.updateLogVisibility)
            }, 'Show demo logs?')
        ]),
        h('div.Deck-settingsField', [
            h('label', 'Theme'),
            h('select', {
                name: 'theme',
                'ev-change': hg.sendValue(channels.updateTheme)
            }, THEMES.map(function (theme) {
                return h('option', {
                    value: theme,
                    selected: theme === state.theme
                }, theme)
            }))
        ])
    ]);
}
