import {array, state, value} from 'mercury'
import nav from './nav'
import scaled from '../scaled'
import render from './render'
import Slide from './Slide'
import themes from './themes'

scaled('.Deck', 720, 480)

function Deck(slides) {
    return nav(state({
        slides: array(slides.map(Slide)),
        activeIndex: value(0),
        isSettingsVisible: value(false),
        isLogVisible: value(true),
        theme: value(themes[0]),
        channels: {
            updateLogVisibility: updateLogVisibility,
            updateTheme: updateTheme
        }
    }))
}

Deck.render = render

export default Deck

function updateLogVisibility(state, data) {
    state.isLogVisible.set(data.isLogVisible)
}

function updateTheme(state, data) {
    state.theme.set(data.theme)
}
