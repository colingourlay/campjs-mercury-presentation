import domready from 'domready'
import {app} from 'mercury'
import Deck from './Deck'
import slides from './slides'

domready(() => {
    const state = Deck(slides)

    state((value) => {
        console.log(value._diff)
    })

    app(document.body, state, Deck.render)
})
