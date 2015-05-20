var hg = require('mercury');
var h = require('mercury').h;
var Prism = require('prismjs');

module.exports = render;

function render(state, isActive, isLogVisible) {
    return h('div.Slide' + (isActive ? '.is-active' : ''), [
        h('div.Slide-content', {
            innerHTML: state.content
        }),
        state.demoState ? h('div.Slide-demo', [
            h('div.Slide-demoContent', [
                hg.partial(state.demoPartial, state.demoState)
            ]),
            isLogVisible ? h('div.Slide-demoLog', [
                h('code.language-javascript.Slide-demoDiffs', state.demoDiffs.map(function (diff) {
                    return h('div.Slide-demoDiff', {
                        innerHTML: Prism.highlight(JSON.stringify(diff), Prism.languages.javascript)
                    });
                }))
            ]) : null
        ]) : null
    ]);
}
