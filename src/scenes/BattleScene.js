class BattleScene extends Scene {
    constructor(game) {
        super(game);
        this.choices = ["rock", "paper", "scissors"];
        this.TIMER_DURATION = 5;
        this.ANIMATION_INTERVAL = 100;
        this.ANIMATION_CYCLES = 6;
        this.BUTTON_WIDTH = 300;
        this.BUTTON_HEIGHT = 60;
        this.PLAYER_BUTTONS_Y = 870;
        this.COMPUTER_BUTTONS_Y = 30;
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
            new Button(15, this.PLAYER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Rock [1]", "rock"),
            new Button(330, this.PLAYER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Paper [2]", "paper"),
            new Button(645, this.PLAYER_BUTTONS_Y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT, "Scissors [3]", "scissors")
        ];

        this.computerButtons = [
            new Button(15, this.COMPUTER_BUTTONS_Y, this.BUTTON_WIDTH, 20, "Rock", "rock"),
            new Button(330, this.COMPUTER_BUTTONS_Y, this.BUTTON_WIDTH, 20, "Paper", "paper"),
            new Button(645, this.COMPUTER_BUTTONS_Y, this.BUTTON_WIDTH, 20, "Scissors", "scissors")
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
                this.game.player.gold++;
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
        if(timeRemaining <= 0) return;
        const centerX = this.game.canvas.width / 2;
        const centerY = this.game.canvas.width / 5;
        const radius = this.game.canvas.width / 10;
        
        const totalMs =  60 * 1000;
        const elapsedMs = totalMs - timeRemaining;
        const minutes = 0;
        const seconds = Math.floor(elapsedMs / 1000) % 60;
        
        // Draw clock face
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 8;
        ctx.stroke();
        
        // Draw clock numbers
        ctx.fillStyle = "#444";
        ctx.font = "24px bold";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 1; i <= 12; i++) {
            const angle = (i - 3) * (Math.PI * 2) / 12;
            const x = centerX + Math.cos(angle) * (radius - 15);
            const y = centerY + Math.sin(angle) * (radius - 15);
            ctx.fillText(i.toString(), x, y);
        }
        
        const hourAngle = ((minutes / 60) * (2 * Math.PI)) - Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(hourAngle) * (radius * 0.4),
            centerY + Math.sin(hourAngle) * (radius * 0.4)
        );
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#666";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(hourAngle) * (radius * 0.7),
            centerY + Math.sin(hourAngle) * (radius * 0.7)
        );
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#444";
        ctx.stroke();
        
        const minuteAngle = ((elapsedMs / 60000) * (2 * Math.PI)) - Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(minuteAngle) * (radius * 0.9),
            centerY + Math.sin(minuteAngle) * (radius * 0.9)
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    
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
        this.game.player.drawHealthBar(ctx, 0, this.game.canvas.height - 20, this.game.canvas.width, 20);
        this.game.currentEnemy.drawHealthBar(ctx, 0, 0, this.game.canvas.width, 20);

        this.computerButtons.forEach(btn => { btn.draw(ctx); });

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

    handleKey(key) {
        if (this.playerSelection) return;
        
        let timeRemaining = this.roundStartTime + this.TIMER_DURATION * 1000 - Date.now();
        if (timeRemaining <= 0) return;

        let action = null;
        if (key === '1') action = 'rock';
        else if (key === '2') action = 'paper';
        else if (key === '3') action = 'scissors';

        if (action) {
            this.playerSelection = { action };
            this.markPlayerSelection();
        }
    }
}

window.BattleScene = BattleScene;
