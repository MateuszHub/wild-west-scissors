class Player {
    constructor() {
        this.MAX_HEALTH = 100;
        this.INITIAL_HEALTH = 100;
        this.HEALTH_BAR_COLORS = {
            background: "#333",
            fill: "#2ecc71",
            text: "white"
        };
        this.health = this.INITIAL_HEALTH;
        this.score = 0;
        this.maxHealth = this.MAX_HEALTH;
        this.damage = 12;
    }

    takeDamage(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            console.warn('Invalid damage amount:', amount);
            return this.health > 0;
        }
        this.health = Math.max(0, this.health - amount);
        return this.health > 0;
    }

    heal(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            console.warn('Invalid heal amount:', amount);
            return this.health;
        }
        this.health = Math.min(this.maxHealth, this.health + amount);
        return this.health;
    }

    addScore(points) {
        this.score += points;
        return this.score;
    }

    drawHealthBar(ctx, x, y, width, height) {
        if (!ctx || typeof x !== 'number' || typeof y !== 'number' || 
            typeof width !== 'number' || typeof height !== 'number') {
            console.error('Invalid health bar parameters');
            return;
        }

        // Draw background
        ctx.fillStyle = this.HEALTH_BAR_COLORS.background;
        ctx.fillRect(x, y, width, height);
        
        // Draw health fill
        const healthWidth = width * (this.health / this.maxHealth);
        ctx.fillStyle = this.HEALTH_BAR_COLORS.fill;
        ctx.fillRect(x, y, healthWidth, height);
        
        // Draw text
        ctx.fillStyle = this.HEALTH_BAR_COLORS.text;
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Player: ${Math.round(this.health)}%`, x + 5, y + 15);
    }
}

window.Player = Player;
