class Enemy {
    constructor(name, baseHealth) {
        this.name = name;
        this.health = baseHealth;
        this.maxHealth = baseHealth;
        this.damage = 25;
    }

    selectMove(timeLeft) {
        // To be implemented by subclasses
        return null;
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health > 0;
    }

    drawHealthBar(ctx, x, y, width, height) {
        ctx.fillStyle = "#333";
        ctx.fillRect(x, y, width, height);
        
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(x, y, width * (this.health / this.maxHealth), height);
        
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`${this.name}: ${this.health}%`, x + 5, y + 15);
    }
}

window.Enemy = Enemy;
