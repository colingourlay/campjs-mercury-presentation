import {h, partial} from  'mercury'
import {highlight, languages} from 'prismjs'

export default function render(state, isActive, isLogVisible) {
    return h('div.Slide' + (isActive ? '.is-active' : ''), [
        h('div.Slide-content', {
            innerHTML: state.content
        }),
        state.demoState ? h('div.Slide-demo', [
            h('div.Slide-demoContent', [
                partial(state.demoRender, state.demoState)
            ]),
            isLogVisible ? h('div.Slide-demoLog', [
                h('code.language-javascript.Slide-demoDiffs',
                    state.demoDiffs.map(renderDiff))
            ]) : null
        ]) : null
    ])
}

function renderDiff(diff) {
    const code = highlight(JSON.stringify(diff), languages.javascript)

    return h('div.Slide-demoDiff', {innerHTML: code})
}
