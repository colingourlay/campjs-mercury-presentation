export default [
`
<h1>Elements of Mercury</h1>
<p>Colin Gourlay (<a href="http://twitter.com/collypops" target="_blank">@collypops</a>)</p>
<br>
<p><small>Slides: <a href="http://eom.surge.sh" target="_blank">eom.surge.sh</a></small></p>
`,
`
<h2>Mercury</h2>
<br>
<ul>
    <li>Utility belt of modules + helper functions <br>for building <strong>unidirectional</strong> apps</li>
    <li>Curated (and mostly created) by <br>Jake Verbaten (<a href="http://twitter.com/Raynos" target="_blank">@Raynos</a>)</li>
    <li><a href="https://github.com/Raynos/mercury" target="_blank">github.com/Raynos/mercury</a></li>
</ul>
`,
`
<h2>Unidirectional?</h2>
`,
`
<img width="100%" src="images/Ideal.svg">
`,
`
<h2>The DOM</h2>
<br>
<video width="502" height="228" autoplay loop muted poster="images/blinds.jpg">
    <source src="videos/blinds.webm" type="video/webm">
    <source src="videos/blinds.mp4" type="video/mp4">
</video>
<br>
<p><small>(This is the first and last GIF in this presentation)</small></p>
`,
`
<img width="100%" src="images/Reality.svg">
`,
`
<h3>How do we deal with the DOM?</h3>
<ul>
    <li><del>jQuery</del></li>
    <li><del>Template libraries</del></li>
</ul>
`,
`
<h1><pre>import hg from 'mercury'</pre></h1>
`,
`
<h1><pre>hg.*</pre></h1>
<ul>
    <li><small>State:</small> <pre>value</pre>, <pre>struct</pre>, <pre>array</pre>, <pre>varhash</pre></li>
    <li><small>Render:</small> <pre>h</pre>, <pre>partial</pre></li>
    <li><small>Raw Output:</small> <pre>create</pre>, <pre>diff</pre>, <pre>patch</pre></li>
    <li><small>Raw Input:</small> <pre>Delegator</pre></li>
    <li><small>Input:</small> <pre>send</pre>, <pre>sendValue</pre>, <pre>sendClick</pre>, <pre>sendChange</pre>, <pre>sendSubmit</pre>, <pre>sendKey</pre></li>
    <li><small>Helpers:</small> <pre>channels</pre>, <pre>state</pre>, <pre>main</pre>, <pre>app</pre></li>
</ul>
`,
`
<img width="100%" src="images/Reality_State.svg">
`,
`
<h3>State</h3>
<br>
<pre>
const state = hg.value('')

state((value) => {
    console.log(value)
})

state.set('foo')

// > 'foo'
</pre>
`,
`
<img width="100%" src="images/Reality_Render.svg">
`,
`
<h3>Render</h3>
<br>
<pre>
const state = hg.value('')
const render = state => hg.h('div', state)

state((value) => {
    const vtree = render(value)

    // Do something with vtree...
})
</pre>
`,
`
<img width="100%" src="images/Reality_Raw_Output.svg">
`,
`
<h3>Raw Output</h3>
<pre>
// Assume we have \`state\` and \`render\`

let vtree = render(state)
let el = hg.create(vtree)

document.body.appendChild(el)

state((state) => {
    const _vtree = render(state)
    const patches = hg.diff(vtree, _vtree)

    el = hg.patch(el, patches)
    vtree = _vtree
})
</pre>
`,
`
<h4>Example: Clock</h4>
<pre>
const state = hg.struct({time: hg.value(new Date())}
const render = state =>
    hg.h('h1', state.time.toTimeString().split(' ')[0])

let vtree = render(state)
let el = hg.create(vtree)
document.body.appendChild(el)

state((state) => {
    const _vtree = render(state)
    el = hg.patch(el, hg.diff(vtree, _vtree))
    vtree = _vtree
})

setInterval(() => { state.time.set(new Date()) }, 1000)
</pre>
`,
{Clock: '<h3>Clock Demo</h3>'},
`
<img width="100%" src="images/Reality_Raw_Input.svg">
`,
`
<h3>Raw Input</h3>
<pre>
const del = hg.Delegator()
const button = document.querySelector('#button')

del.addEventListener(button, 'click', (event) => {
    // We know \`event.target\` was clicked
})
</pre>
`,
`
<img width="100%" src="images/Reality_Input.svg">
`,
`
<h3>Input</h3>
<br>
<pre>
hg.h('form', {'ev-submit': hg.sendSubmit(listener, {baz: 0})}, [
    hg.h('input', {type: 'text', name: foo}),
    hg.h('input', {type: 'checkbox', name: bar}),
    hg.h('input', {type: 'submit'})
])

const listener = (data) => {
    // data == {
    //     foo: '',
    //     bar: false,
    //     baz: 0
    // }
}
</pre>
`,
`
<img width="100%" src="images/Reality_hg_channels.svg">
`,
`
<h3><pre>hg.channels</pre></h3>
<pre>
const state = hg.struct({
    foo: hg.value(0),
    bar: hg.value(0),
    channels: hg.value(null)
})

state.channels.set(hg.channels({
    baz: (state, data) => {
        // like the previous listener example,
        // but it has access to state...
        state.foo.set(data.foo)
    }
}, state))
</pre>
`,
`
<img width="100%" src="images/Reality_hg_state.svg">
`,
`
<h3><pre>hg.state</pre></h3>
<pre>
// Like \`hg.struct\`, but treats the \`channels\`
// property as a special case. It transparently
// calls \`hg.channels\` and binds state for you.

const state = hg.state({
    foo: hg.value(0),
    bar: hg.value(0),
    channels: {
        baz: (state, data) => {
            // (same as previous slide)
        }
    }
})
</pre>
`,
`
<h3>Example: Counter</h3>
<pre>
hg.state({
    counter: hg.value(0),
    channels: {
        increment: (state) => {
            state.counter.set(state.counter() + 1)
        }
    }
})

const render = state =>
    h('button', {
        'ev-click': hg.sendClick(state.channels.increment)
    }, 'Clicks: ' + state.counter)
</pre>
`,
{Counter: '<h3>Counter Demo</h3>'},
`
<h3>Example: Syncable Clock</h3>
<pre>
hg.state({
    time: hg.value(new Date()),
    sync: hg.value(null),
    channels: {
        toggleSync: (state) => {
            if (state.sync() != null) {
                clearInterval(state.sync())
                state.sync.set(null)
            } else {
                state.sync.set(setInterval(() => {
                    state.time.set(new Date())
                }, 1000))
            }
        }
    }
})
</pre>
`,
`
<h3>Syncable Clock (cont.)</h3>
<pre>
const render = state =>
    h('div', [
        h('h4', state.time.toTimeString().split(' ')[0]),
        h('button', {
            style: {
                'background-color': state.sync ? '#966' : '#696'
            },
            'ev-click': hg.sendClick(state.channels.toggleSync)
        }, state.sync ? 'stop syncing' : 'start syncing')
    ])
</pre>
`,
{SyncableClock: '<h3>Syncable Clock</h3>'},
`
<img width="100%" src="images/Reality_hg_main.svg">
`,
`
<h3><pre>hg.main</pre></h3>
<br>
<pre>
// Assume we have \`state\` (including channels) and \`render\`

const main = hg.main(state(), render, {
    diff: hg.diff,
    create: hg.create,
    patch: hg.patch
})

document.body.appendChild(main.target)
state(main.update)
</pre>
<br>
<p>DOM patches happen inside <pre>requestAnimationFrame</pre></p>
`,
`
<img width="100%" src="images/Reality_hg_app.svg">
`,
`
<h3><pre>hg.app</pre></h3>
<pre>
// Assume we have \`state\` (including channels) and \`render\`

hg.app(document.body, state, render)
</pre>
`,
`
<h3>Counter (full code)</h3>
<pre>
import {app, h, sendClick, state, value} from 'mercury'

app(
    document.body,
    state({
        counter: value(0),
        channels: {
            increment: (state) => {
                state.counter.set(state.counter() + 1)
            }
        }
    }),
    state => h('button', {
        'ev-click': sendClick(state.channels.increment)
    }, 'Clicks: ' + state.counter)
)
</pre>
`,
`
<img width="100%" src="images/Effective.svg">
`,
`
<img width="55.1301685%" src="images/js-for-millenials.jpg" style="border:1px solid #000"/>
`,
`
<h2>Packages!</h2>
<p>99% of the mercury API is npm installable</p>
<pre>
import value     from 'observ'
import struct    from 'observ-struct'
import array     from 'observ-array'
import varhash   from 'observ-varhash'
import h         from 'virtual-dom/virtual-hyperscript'
import partial   from 'vdom-thunk'
import create    from 'virtual-dom/vdom/create-element'
import diff      from 'virtual-dom/vtree/diff'
import patch     from 'virtual-dom/vdom/patch'
import Delegator from 'dom-delegator'
import send      from 'value-event/event'
import send$     from 'value-event/$' // *
import main      from 'main-loop'

// * $ -> value/click/change/submit/key
</pre>
`,
`
<h2>Mix &amp; match</h2>
<ul>
    <li>Define your models in Backbone?</li>
    <li>Write your render functions in JSX?</li>
    <li>Replace virtual-dom with React?</li>
    <li>Replace observ with Rx.JS Observables?</li>
</ul>
`,
`
<h2>Thanks</h2>
<p><a href="http://twitter.com/collypops" target="_blank">@collypops</a></p>
<ul>
    <li>This slide deck: <a href="http://eom.surge.sh" target="_blank">eom.surge.sh</a></li>
    <li>Slides code (mercury app): <a href="http://bit.ly/eomcode" target="_blank">bit.ly/eomcode</a></li>
    <li>Mercury FAQs: <a href="http://bit.ly/mercuryfaq">bit.ly/mercuryfaq</a></li>
    <li>Book cover image credit: <a href="https://twitter.com/wesbos">@wesbos</a></li>
    <li>The GIF credit: Seth MacFarlane?</li>
</ul>
`
]
