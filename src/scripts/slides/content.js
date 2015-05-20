module.exports = [`

<h1>Elements of Mercury</h1>
<p>Colin Gourlay (<a href="http://twitter.com/collypops" target="_blank">@collypops</a>)</p>
<br>
<p><small>Slides: <a href="http://eom.surge.sh" target="_blank">eom.surge.sh</a></small></p>

`,`

<h4>Counter</h4>
<pre>
hg.state({
    counter: hg.value(0),
    channels: {
        increment: function (state) {
            state.counter.set(state.counter() + 1);
        }
    }
});

function render(state) {
    return h('button', {
        'ev-click': hg.sendClick(state.channels.increment)
    }, 'Clicks: ' + state.counter);
}
</pre>

`, {Counter: `

<h4>Counter Demo</h4>

`},`

<h4>Clock</h4>
<pre>
hg.state({
    time: hg.value(new Date()),
    sync: hg.value(null),
    channels: {
        toggleSync: function (state) {
            if (state.sync() != null) {
                clearInterval(state.sync());
                state.sync.set(null);
            } else {
                state.sync.set(setInterval(function () {
                    state.time.set(new Date())
                }, 1000));
            }
        }
    }
}
</pre>

`,`

<h4>Clock (cont.)</h4>
<pre>
function render(state) {
    return h('div', [
        h('h4', state.time.toTimeString().split(' ')[0]),
        h('button', {
            style: {
                'background-color': state.sync ? '#966' : '#696'
            },
            'ev-click': hg.sendClick(state.channels.toggleSync)
        }, state.sync ? 'stop syncing' : 'start syncing')
    ]);
}
</pre>

`, {Clock: `

<h4>Clock Demo</h4>

`},`

<h2>Thanks</h2>
<p>Colin Gourlay (<a href="http://twitter.com/collypops" target="_blank">@collypops</a>)</p>

`];
