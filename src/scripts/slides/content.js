var content = [function () {/*!

<h1>Elements of Mercury</h1>
<p>Colin Gourlay - @collypops</p>

*/}, function () {/*!

<p>one</p>

*/}, function () {/*!

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

*/}, function ClickCounter() {/*!

*/}];

module.exports = content;
