class Player {
    constructor() {
        this.health = 100;
        this.score = 0;
        this.maxHealth = 100;
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health > 0;
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        return this.health;
    }

    addScore(points) {
        this.score += points;
        return this.score;
    }

    drawHealthBar(ctx, x, y, width, height) {
        ctx.fillStyle = "#333";
        ctx.fillRect(x, y, width, height);
        
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(x, y, width * (this.health / this.maxHealth), height);
        
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Player: ${this.health}%`, x + 5, y + 15);
    }
}

window.Player = Player;
