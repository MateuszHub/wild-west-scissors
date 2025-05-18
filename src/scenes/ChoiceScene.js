class ChoiceScene extends Scene {
    constructor(game) {
        super(game);
        this.buttons = [
            new Button(100, 200, 120, 50, "Next Battle", "next"),
            new Button(240, 200, 120, 50, "Heal Up", "heal"),
            new Button(380, 200, 120, 50, "Go to Shop", "shop")
        ];
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`You defeated ${this.game.previousEnemy.name}!`, this.game.canvas.width / 2, 100);
        
        ctx.font = "20px Arial";
        ctx.fillText(`Player Health: ${this.game.player.health}%`, this.game.canvas.width / 2, 140);
        ctx.fillText(`Next opponent: ${this.game.currentEnemy.name}`, this.game.canvas.width / 2, 170);

        this.buttons.forEach(btn => btn.draw(ctx));
    }

    handleClick(x, y) {
        for (let btn of this.buttons) {
            if (btn.isClicked(x, y)) {
                this.handleChoice(btn.action);
                return;
            }
        }
    }

    handleChoice(choice) {
        if (choice === "next") {
            this.game.changeScene('battle');
        } else if (choice === "heal") {
            this.game.player.heal(30);
            this.game.changeScene('battle');
        } else if (choice === "shop") {
            // TODO: Implement shop
            this.game.changeScene('battle');
        }
    }
}
