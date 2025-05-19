class BattleScene extends Scene {
    constructor(game) {
        super(game);
        this.choices = ["rock", "paper", "scissors"];
        this.TIMER_DURATION = 5;
        this.ANIMATION_INTERVAL = 100;
        this.ANIMATION_CYCLES = 6;
        this.BUTTON_WIDTH = 120;
        this.BUTTON_HEIGHT = 50;
        this.PLAYER_BUTTONS_Y = 320;
        this.COMPUTER_BUTTONS_Y = 50;
        this.playerButtons = [];
        this.timeLeft = 5;
        this.timerId = null;
        this.enemyAnimation = null;
        this.resultText = "";
        this.roundStartTime = 0;
        this.computerSelection = null;
        this.playerSelection = null;

        this.bg = new Image();
        this.bg.src = "bg.png";

        this.playerButtons = [
            new Button(100, this.PLAYER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Rock [1]", "rock"),
            new Button(240, this.PLAYER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Paper [2]", "paper"),
            new Button(380, this.PLAYER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Scissors [3]", "scissors")
        ];

        this.computerButtons = [
            new Button(100, this.COMPUTER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Rock", "rock"),
            new Button(240, this.COMPUTER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Paper", "paper"),
            new Button(380, this.COMPUTER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Scissors", "scissors")
        ];
    }


    enter() {

        this.startRound();
    }

    startRound() {
        this.roundStartTime = Date.now();
        this.resultText = "";
        this.playerSelection = null;
        this.computerSelection = null;
        for (let i = 0; i < this.computerButtons.length; i++) {
            this.computerButtons[i].color = "gray";
        }
        this.enemyAnimation = setInterval(() => this.animateComputerChoice(), this.ANIMATION_INTERVAL);
        this.startTimer();
    }

    updateCpuMove() {
        if (!this.computerSelection) {
            let timeRemaining = this.roundStartTime + this.TIMER_DURATION * 1000 - Date.now();
            if (timeRemaining <= 0) return;
            const enemy = this.game.currentEnemy;
            this.computerSelection = enemy.selectMove(timeRemaining, this.playerSelection == null ? null : this.playerSelection.move);
        }
    }

    animateComputerChoice() {
        if (this.computerSelection) return;
        for (let i = 0; i < this.computerButtons.length; i++) {
            this.computerButtons[i].color = "gray";
        }
        let index = Math.floor(Math.random() * this.computerButtons.length);
        this.computerButtons[index].color = "darkgray";
    }

    startTimer() {
        if (this.timerId) clearInterval(this.timerId);
        this.timeLeft = this.TIMER_DURATION;
        this.timerId = setInterval(() => {
            try {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.endRound();
                }
            } catch (error) {
                console.error("Timer error:", error);
                clearInterval(this.timerId);
            }
        }, 1000);
    }

    endRound() {
        clearInterval(this.timerId);
        const result = this.getResult();
        this.updateHealth(result);
        switch (result) {
            case 1:
                this.resultText = "You win!";
                break;
            case -1:
                this.resultText = "You lose!";
                break;
            default:
                this.resultText = "Draw";
        }

        setTimeout(() => {
            if (this.game.player.health <= 0) {
                this.game.changeScene('gameOver');
            } else if (this.game.currentEnemy.health <= 0) {
                this.game.nextEnemy();
                this.game.changeScene('choice');
            } else {
                this.startRound();
            }
        }, 2000);
    }

    getResult() {
        if (!this.playerSelection && !this.computerSelection) return 0;
        if (!this.playerSelection) {
            return -1;
        } else if (!this.computerSelection) {
            return 1;
        } else if (this.playerSelection.action === this.computerSelection.action) {
            return 0;
        } else if (
            (this.playerSelection.action === "rock" && this.computerSelection.action === "scissors") ||
            (this.playerSelection.action === "paper" && this.computerSelection.action === "rock") ||
            (this.playerSelection.action === "scissors" && this.computerSelection.action === "paper")
        ) {
            return 1;
        } else {
            return -1;
        }
    }

    updateHealth(result) {
        if (result == -1) {
            this.game.player.takeDamage(this.computerSelection.damage);
        } else if (result == 1) {
            this.game.currentEnemy.takeDamage(this.game.player.damage);
        }
    }

    markComputerSelection() {
        if (!this.computerSelection) {
            return;
        };
        clearInterval(this.enemyAnimation);
        for (let i = 0; i < this.computerButtons.length; i++) {
            if (this.computerButtons[i].action === this.computerSelection.action) {
                this.computerButtons[i].color = "#e74c3c";
            } else {
                this.computerButtons[i].color = "gray";
            }
        }
    }

    markPlayerSelection() {
        for (let i = 0; i < this.playerButtons.length; i++) {
            if (this.playerSelection && this.playerButtons[i].action === this.playerSelection.action) {
                this.playerButtons[i].color = "#aaffbb";
            } else {
                this.playerButtons[i].color = "gray";
            }
        }
    }

    drawBackground(ctx) {
        if (this.bg.complete) ctx.drawImage(this.bg, 0, 0, this.game.canvas.width, this.game.canvas.height);
    }

    drawTimer(ctx, timeRemaining) {
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`Time left: ${Math.floor(timeRemaining)}`, this.game.canvas.width / 2, 50);
    }


    drawEnv(ctx) {
        this.drawBackground(ctx);
        this.game.player.draw(ctx);
        this.game.currentEnemy.draw(ctx);
        let timeRemaining = this.roundStartTime + this.TIMER_DURATION * 1000 - Date.now();
        this.drawTimer(ctx, timeRemaining);
    }


    draw(ctx) {
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.drawEnv(ctx);
        this.updateCpuMove();
        this.markComputerSelection();
        this.markPlayerSelection();


        // Draw health bars
        this.game.player.drawHealthBar(ctx, 50, 20, 200, 20);
        this.game.currentEnemy.drawHealthBar(ctx, 350, 20, 200, 20);

        // Draw computer section
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.game.currentEnemy.name, this.game.canvas.width / 2, 30);
        this.computerButtons.forEach(btn => { btn.draw(ctx); });

        // Draw result
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.fillText(this.resultText, this.game.canvas.width / 2, 180);
        ctx.font = "20px Arial";
        ctx.fillText(`Time left: ${this.timeLeft}s`, this.game.canvas.width / 2, 220);

        // Draw player section
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "20px Arial";
        ctx.fillText("Your choice", this.game.canvas.width / 2, 300);

        // Draw player buttons
        this.playerButtons.forEach(btn => {
            btn.draw(ctx);
        });
    }



    handleClick(x, y) {
        if (this.playerSelection) return;
        for (let btn of this.playerButtons) {
            let timeRemaining = this.roundStartTime + this.TIMER_DURATION * 1000 - Date.now();
            if (btn.isClicked(x, y) && timeRemaining > 0) {
                this.playerSelection = {
                    action: btn.action
                };
                return;
            }
        }
    }
}

window.BattleScene = BattleScene;
