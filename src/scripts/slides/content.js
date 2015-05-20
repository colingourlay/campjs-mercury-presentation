module.exports = [`
<h1>Elements of Mercury</h1>
<p>Colin Gourlay (<a href="http://twitter.com/collypops" target="_blank">@collypops</a>)</p>
<br>
<br>
<p><small>Slides: <a href="http://eom.surge.sh" target="_blank">eom.surge.sh</a></small></p>

`,`

<p>one</p>

`,`

<h2>Click Counter</h2>
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

`, {ClickCounter: `

<p>Demo</p>

`},`

<h2>Thanks</h2>
<p>Colin Gourlay (<a href="http://twitter.com/collypops" target="_blank">@collypops</a>)</p>

`];
