module.exports = nav;

function nav(state) {
    var startPosition, delta;

    // Keyboard

    document.documentElement.addEventListener('keydown', function (e) {
        if (state.isSettingsVisible() &&
            e.keyCode !== 27) { return; }

        switch (e.keyCode) {
            case 27:
                toggleSettingsVisibility(state);
                break;
            case 37:
            case 188:
                backward(state);
                break;
            case 13:
            case 32:
            case 39:
                forward(state);
                break;
            default:
                break;
        }
    });

    // Touch

    document.documentElement.addEventListener('touchstart', function (e) {
        if (e.touches.length == 1) {
            startPosition = e.touches[0].pageX;
            delta = 0;
        }
    });

    document.documentElement.addEventListener('touchmove', function (e) {
        if (e.touches.length == 1) {
            e.preventDefault();
            delta = e.touches[0].pageX - startPosition;
        }
    });

    document.documentElement.addEventListener('touchend', function () {
        if (state.isSettingsVisible()) { return; }

        if (Math.abs(delta) > 50) {
            (delta > 0 ? backward : forward)(state);
        }
    });
}

function toggleSettingsVisibility(state) {
    state.isSettingsVisible.set(!state.isSettingsVisible());
}

function go(state, index) {
    if (index !== state.activeIndex() && index > -1 && index < state.slides().length) {
        state.activeIndex.set(index);
    }
}

function backward(state) {
    go(state, state.activeIndex() - 1);
}

function forward(state) {
    go(state, state.activeIndex() + 1);
}
