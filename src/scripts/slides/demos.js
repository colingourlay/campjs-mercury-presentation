import {h, sendClick, state, struct, value} from 'mercury'

export default {
    Clock: {
        state: (() => {
            const state = struct({time: new Date()})

            setInterval(() => {
                state.set({time: new Date()})
            }, 1000)

            return state
        })(),
        render: state => h('h1', state.time.toTimeString().split(' ')[0])
    },
    Counter: {
        state: state({
            counter: value(0),
            channels: {
                increment: (state) => {
                    state.counter.set(state.counter() + 1)
                }
            }
        }),
        render: state => h('button', {
            'ev-click': sendClick(state.channels.increment)
        }, `${state.counter} clicks`)
    },
    SyncableClock: {
        state: state({
            time: value(new Date()),
            sync: value(null),
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
        }),
        render: state => h('div', [
            h('h4', state.time.toTimeString().split(' ')[0]),
            h('button', {
                style: {'background-color': state.sync ? '#966' : '#696'},
                'ev-click': sendClick(state.channels.toggleSync)
            }, state.sync ? 'stop syncing' : 'start syncing')
        ])
    }
}
