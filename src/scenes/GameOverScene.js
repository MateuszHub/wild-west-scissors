class GameOverScene extends Scene {
    constructor(game) {
        super(game);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.game.resultText, this.game.canvas.width / 2, 100);
        
        ctx.font = "20px Arial";
        ctx.fillText("Click to play again", this.game.canvas.width / 2, 140);
    }

    handleClick() {
        this.game.resetGame();
        this.game.changeScene('menu');
    }
}
