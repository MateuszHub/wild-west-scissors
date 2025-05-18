class Scene {
    constructor(game) {
        this.game = game;
    }

    enter() {
        // Called when scene becomes active
    }

    exit() {
        // Called when scene is no longer active
    }

    update(deltaTime) {
        // Update scene logic
    }

    draw(ctx) {
        // Draw scene elements
    }

    handleClick(x, y) {
        // Handle mouse clicks
    }

    handleKey(key) {
        // Handle keyboard input
    }
}

window.Scene = Scene;
