class MenuScene extends Scene {
    constructor(game) {
        super(game);
        this.startButton = new Button(this.game.canvas.width / 2 - 60, 450, 120, 50, "Start Game", "start");
    }

    draw(ctx) {
        try {
            // Clear canvas first
            ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            
            // Set text styles once
            ctx.fillStyle = "#ecf0f1";
            ctx.textAlign = "center";
            
            // Draw title
            ctx.font = "32px Arial";
            ctx.fillText("Wild West Scissors", this.game.canvas.width / 2, 240);
            
            // Draw rules
            ctx.font = "24px Arial";
            ctx.fillText("Game Rules:", this.game.canvas.width / 2, 300);
            ctx.fillText("1. Choose rock, paper or scissors", this.game.canvas.width / 2, 340);
            ctx.fillText("2. Defeat 3 opponents", this.game.canvas.width / 2, 380);
            ctx.fillText("3. Each victory gives you 1 gold", this.game.canvas.width / 2, 420);

            // Draw button
            this.startButton.draw(ctx);
        } catch (error) {
            console.error('Menu drawing error:', error);
        }
    }

    handleClick(x, y) {
        if (this.startButton.isClicked(x, y)) {
            this.game.startGame();
        }
    }
}

window.MenuScene = MenuScene;
