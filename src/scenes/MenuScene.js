class MenuScene extends Scene {
    constructor(game) {
        super(game);
        this.startButton = new Button(240, 250, 120, 50, "Start Game", "start");
    }

    draw(ctx) {
        try {
            // Clear canvas first
            ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            
            // Set text styles once
            ctx.fillStyle = "#ecf0f1";
            ctx.textAlign = "center";
            
            // Draw title
            ctx.font = "24px Arial";
            ctx.fillText("Wild West Scissors", this.game.canvas.width / 2, 80);
            
            // Draw rules
            ctx.font = "18px Arial";
            ctx.fillText("Game Rules:", this.game.canvas.width / 2, 120);
            ctx.fillText("1. Choose rock, paper or scissors", this.game.canvas.width / 2, 150);
            ctx.fillText("2. Defeat 3 opponents", this.game.canvas.width / 2, 180);
            ctx.fillText("3. Each victory deals 10 damage", this.game.canvas.width / 2, 210);

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
