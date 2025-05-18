class MenuScene extends Scene {
    constructor(game) {
        super(game);
        this.startButton = new Button(240, 250, 120, 50, "Start Game", "start");
    }

    draw(ctx) {
        try {
            console.log('Drawing MenuScene');
            ctx.fillStyle = "#ecf0f1";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Wild West Scissors", this.game.canvas.width / 2, 80);
            
            ctx.font = "18px Arial";
            ctx.fillText("Zasady gry:", this.game.canvas.width / 2, 120);
            ctx.fillText("1. Wybierz kamień, papier lub nożyce", this.game.canvas.width / 2, 150);
            ctx.fillText("2. Pokonaj 3 przeciwników", this.game.canvas.width / 2, 180);
            ctx.fillText("3. Każde zwycięstwo zadaje 10 obrażeń", this.game.canvas.width / 2, 210);

            this.startButton.draw(ctx);
        } catch (error) {
            console.error('Error drawing MenuScene:', error);
        }
    }

    handleClick(x, y) {
        if (this.startButton.isClicked(x, y)) {
            this.game.startGame();
        }
    }
}

window.MenuScene = MenuScene;
