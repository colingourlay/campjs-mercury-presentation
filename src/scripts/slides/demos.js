var hg = require('mercury');
var h = require('mercury').h;

var demos = {
    Counter: {
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
            }, state.counter + ' clicks');
        }
    },
    Clock: {
        state: hg.state({
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
        }),
        partial: function (state) {
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
    }
};

module.exports = demos;
