import {h, partial, sendValue} from 'mercury'
import Slide from './Slide'
import THEMES from './themes'

export default function render(state) {
    const settings = state.isSettingsVisible ?
        partial(renderSettings, state, state.channels) : null

    return h('div.Deck.Deck--theme-' + state.theme,
        state.slides.map((slide, index) => {
            const isSlideActive = index === state.activeIndex

            return Slide.render(slide, isSlideActive, state.isLogVisible)
        }).concat([settings])
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
                'ev-change': sendValue(channels.updateLogVisibility)
            }, 'Show demo logs?')
        ]),
        h('div.Deck-settingsField', [
            h('label', 'Theme'),
            h('select', {
                name: 'theme',
                'ev-change': sendValue(channels.updateTheme)
            }, THEMES.map(theme => h('option', {
                value: theme,
                selected: theme === state.theme
            }, theme)))
        ])
    ])
}
