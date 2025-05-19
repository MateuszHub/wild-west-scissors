class ChoiceScene extends Scene {
    constructor(game) {
        super(game);
        this.buttons = [
            new Button(100, 350, 120, 50, "Next Battle", "next"),
            new Button(240, 350, 120, 50, "Heal (1g)", "heal"),
            new Button(380, 350, 120, 50, "Upgrade (1g)", "upgrade")
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
        ctx.fillText(`Gold: ${this.game.player.gold}`, this.game.canvas.width / 2, 170);
        ctx.fillText(`Next opponent: ${this.game.currentEnemy.name}`, this.game.canvas.width / 2, 200);

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
            if (this.game.player.gold >= 1) {
                this.game.player.gold -= 1;
                this.game.player.heal(10);
            }
        } else if (choice === "upgrade") {
            if (this.game.player.gold >= 1) {
                this.game.player.gold -= 1;
                this.game.player.damage += 1;
            }
        }
    }
}
