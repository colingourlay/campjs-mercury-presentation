import {array, state, value} from 'mercury'
import render from './render'

function Slide(slide) {
    const model = state({
        content: value(slide.content),
        demoState: slide.demo ? slide.demo.state : null,
        demoRender: slide.demo ? value(slide.demo.render) : null,
        demoDiffs: slide.demo ? array([]) : null
    })

    if (slide.demo) {
        model.demoState((value) => {
            model.demoDiffs.push(value._diff)
        })
    }

    return model
}

Slide.render = render

export default Slide
