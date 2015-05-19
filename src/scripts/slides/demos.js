var hg = require('mercury');
var h = require('mercury').h;

var demos = {
    ClickCounter: {
        state: hg.state({
            counter: hg.value(0),
            channels: {
                increment: function (state) {
                    state.counter.set(state.counter() + 1);
                }
            }
        }),
        partial: function (state) {
            return h('button', {
                'ev-click': hg.sendClick(state.channels.increment)
            }, 'Clicks: ' + state.counter);
        }
    }
};

module.exports = demos;
