class GameOverScene extends Scene {
    constructor(game) {
        super(game);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        
        if (this.game.player.health <= 0) {
            ctx.fillText("You lost!", this.game.canvas.width / 2, 200);
        } else {
            ctx.fillText("You won!", this.game.canvas.width / 2, 200);
        }
        
        ctx.font = "20px Arial";
        ctx.fillText("Click to menu", this.game.canvas.width / 2, 280);
    }

    handleClick() {
        this.game.resetGame();
        this.game.changeScene('menu');
    }
}
