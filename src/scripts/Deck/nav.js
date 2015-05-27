export default function nav(state) {
    let startPosition, delta

    // Keyboard

    document.documentElement.addEventListener('keydown', (event) => {
        if (state.isSettingsVisible() && event.keyCode !== 27) {
            return
        }

        switch (event.keyCode) {
            case 27:
                toggleSettingsVisibility(state)
                break;
            case 37:
            case 188:
                backward(state)
                break;
            case 13:
            case 32:
            case 39:
                forward(state)
                break;
            default:
                break
        }
    })

    // Touch

    document.documentElement.addEventListener('touchstart', (event) => {
        if (event.touches.length == 1) {
            startPosition = event.touches[0].pageX
            delta = 0
        }
    })

    document.documentElement.addEventListener('touchmove', (event) => {
        if (event.touches.length == 1) {
            event.preventDefault()
            delta = event.touches[0].pageX - startPosition
        }
    })

    document.documentElement.addEventListener('touchend', () => {
        if (state.isSettingsVisible()) {
            return
        }

        if (Math.abs(delta) > 50) {
            (delta > 0 ? backward : forward)(state)
        }
    })

    return state
}

function toggleSettingsVisibility(state) {
    state.isSettingsVisible.set(!state.isSettingsVisible())
}

function go(state, index) {
    if (index !== state.activeIndex() && index > -1 && index < state.slides().length) {
        state.activeIndex.set(index)
    }
}

function backward(state) {
    go(state, state.activeIndex() - 1)
}

function forward(state) {
    go(state, state.activeIndex() + 1)
}
