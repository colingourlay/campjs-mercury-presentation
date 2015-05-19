var hg = require('mercury');

module.exports = Slide;

function Slide(slide) {
    var state = hg.state({
        content: hg.value(slide.content),
        demoState: slide.demo ? slide.demo.state : null,
        demoPartial: slide.demo ? hg.value(slide.demo.partial) : null,
        demoDiffs: slide.demo ? hg.array([]) : null
    });

    if (slide.demo) {
        state.demoState(function (value) {
            state.demoDiffs.push(value._diff);
        });
    }

    return state;
}

Slide.render = require('./render');
