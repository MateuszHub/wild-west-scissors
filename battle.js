// Battle state handling
const battle = {
    choices: ["rock", "paper", "scissors"],
    labels: {
        rock: "🪨 Kamień",
        paper: "📄 Papier",
        scissors: "✂️ Nożyce"
    },

    playerButtons: [
        { choice: "rock", x: 100, y: 320, width: 120, height: 50 },
        { choice: "paper", x: 240, y: 320, width: 120, height: 50 },
        { choice: "scissors", x: 380, y: 320, width: 120, height: 50 }
    ],

    computerButtons: [
        { choice: "rock", x: 100, y: 50, width: 120, height: 50 },
        { choice: "paper", x: 240, y: 50, width: 120, height: 50 },
        { choice: "scissors", x: 380, y: 50, width: 120, height: 50 }
    ],

    drawBattleScreen: function(ctx, enemy, resultText, timeLeft, computerChoice) {
        // Draw computer section at top
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(enemy.name, canvas.width / 2, 30);

        this.computerButtons.forEach(btn => {
            const isActive = computerChoice === btn.choice;
            ctx.fillStyle = isActive ? "#e74c3c" : "#2c3e50";
            ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
            ctx.fillStyle = "white";
            ctx.font = "18px Arial";
            ctx.fillText(this.labels[btn.choice], btn.x + btn.width / 2, btn.y + 32);
        });

        // Draw result in middle
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(resultText, canvas.width / 2, 180);
        
        ctx.font = "20px Arial";
        ctx.fillText(`Pozostały czas: ${timeLeft}s`, canvas.width / 2, 220);

        // Draw player section at bottom
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Twój wybór", canvas.width / 2, 300);

        this.playerButtons.forEach(btn => {
            ctx.fillStyle = "#3498db";
            ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
            ctx.fillStyle = "white";
            ctx.font = "18px Arial";
            ctx.fillText(this.labels[btn.choice], btn.x + btn.width / 2, btn.y + 32);
        });
    },

    getComputerChoice: function() {
        const index = Math.floor(Math.random() * this.choices.length);
        return this.choices[index];
    },

    getResult: function(player, computer) {
        if (!player) return "Czas minął! Przegrałeś!";
        if (player === computer) return "Remis!";
        if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            return "Wygrałeś!";
        } else {
            return "Przegrałeś!";
        }
    },

    handlePlayerChoice: function(mouseX, mouseY) {
        for (let btn of this.playerButtons) {
            if (
                mouseX >= btn.x &&
                mouseX <= btn.x + btn.width &&
                mouseY >= btn.y &&
                mouseY <= btn.y + btn.height
            ) {
                return btn.choice;
            }
        }
        return null;
    }
};
