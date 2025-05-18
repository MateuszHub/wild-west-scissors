class BattleScene extends Scene {
    constructor(game) {
        super(game);
        this.choices = ["rock", "paper", "scissors"];
        this.labels = {
            rock: "đźŞ¨ KamieĹ„",
            paper: "đź“„ Papier",
            scissors: "âś‚ď¸Ź NoĹĽyce"
        };
        this.playerButtons = [];
        this.computerButtons = [];
        this.timeLeft = 5;
        this.timerId = null;
        this.computerChoice = null;
        this.resultText = "";
        this.roundStartTime = 0;
        this.computerSelection = null;
        this.playerSelection = null;
        this.setupButtons();
    }

    setupButtons() {
        // Player buttons
        this.playerButtons = [
            new Button(100, 320, 120, 50, this.labels.rock, "rock"),
            new Button(240, 320, 120, 50, this.labels.paper, "paper"),
            new Button(380, 320, 120, 50, this.labels.scissors, "scissors")
        ];

        // Computer buttons (visual only)
        this.computerButtons = [
            new Button(100, 50, 120, 50, this.labels.rock, null),
            new Button(240, 50, 120, 50, this.labels.paper, null),
            new Button(380, 50, 120, 50, this.labels.scissors, null)
        ];
    }

    enter() {
        this.startRound();
    }

    startRound() {
        this.roundStartTime = Date.now();
        this.resultText = "";
        this.playerSelection = null;
        this.computerChoice = null;
        this.computerSelection = null;
        
        const enemy = this.game.currentEnemy;
        this.computerSelection = enemy.selectMove(this.timeLeft);
        
        if (this.computerSelection) {
            setTimeout(() => {
                this.animateComputerChoice();
            }, this.computerSelection.selectionTime);
        }

        this.startTimer();
    }

    animateComputerChoice() {
        let animIndex = 0;
        const animInterval = setInterval(() => {
            this.computerChoice = this.choices[animIndex % this.choices.length];
            animIndex++;
            if (animIndex > 6) {
                clearInterval(animInterval);
                this.computerChoice = this.computerSelection.move;
            }
        }, 50);
    }

    startTimer() {
        if (this.timerId) clearInterval(this.timerId);
        this.timeLeft = 5;
        this.timerId = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.endRound();
            }
        }, 1000);
    }

    endRound() {
        clearInterval(this.timerId);
        const result = this.getResult();
        this.updateHealth(result);
        
        setTimeout(() => {
            if (this.game.player.health <= 0) {
                this.game.changeScene('gameOver');
            } else if (this.game.currentEnemy.health <= 0) {
                this.game.nextEnemy();
                this.game.changeScene('choice');
            } else {
                this.startRound();
            }
        }, 1000);
    }

    getResult() {
        if (!this.playerSelection) {
            return "Czas minÄ…Ĺ‚! PrzegraĹ‚eĹ›!";
        } else if (!this.computerChoice) {
            return "WygraĹ‚eĹ›! (Przeciwnik nie wybraĹ‚ ruchu)";
        } else if (this.playerSelection.action === this.computerChoice) {
            return "Remis!";
        } else if (
            (this.playerSelection.action === "rock" && this.computerChoice === "scissors") ||
            (this.playerSelection.action === "paper" && this.computerChoice === "rock") ||
            (this.playerSelection.action === "scissors" && this.computerChoice === "paper")
        ) {
            return "WygraĹ‚eĹ›!";
        } else {
            return "PrzegraĹ‚eĹ›!";
        }
    }

    updateHealth(result) {
        if (result === "PrzegraĹ‚eĹ›!" && this.computerChoice) {
            this.game.player.takeDamage(this.computerSelection.damage);
        } else if (result.startsWith("WygraĹ‚eĹ›!") && this.playerSelection) {
            this.game.currentEnemy.takeDamage(10);
        }
    }

    draw(ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        // Draw health bars
        this.game.player.drawHealthBar(ctx, 50, 20, 200, 20);
        this.game.currentEnemy.drawHealthBar(ctx, 350, 20, 200, 20);

        // Draw computer section
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.game.currentEnemy.name, this.game.canvas.width / 2, 30);

        // Draw computer buttons
        this.computerButtons.forEach(btn => {
            const isSelected = this.computerChoice === btn.action;
            const isAnimating = !this.computerChoice && this.computerSelection;
            btn.color = isSelected ? "#e74c3c" : "#2c3e50";
            btn.draw(ctx);
        });

        // Draw result
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.fillText(this.resultText, this.game.canvas.width / 2, 180);
        ctx.font = "20px Arial";
        ctx.fillText(`PozostaĹ‚y czas: ${this.timeLeft}s`, this.game.canvas.width / 2, 220);

        // Draw player section
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "20px Arial";
        ctx.fillText("TwĂłj wybĂłr", this.game.canvas.width / 2, 300);

        // Draw player buttons
        this.playerButtons.forEach(btn => {
            btn.draw(ctx);
        });
    }

    handleClick(x, y) {
        for (let btn of this.playerButtons) {
            if (btn.isClicked(x, y)) {
                this.playerSelection = {
                    action: btn.action,
                    time: Date.now()
                };
                if (this.computerChoice || this.timeLeft <= 0) {
                    this.endRound();
                }
                return;
            }
        }
    }
}

window.BattleScene = BattleScene;
