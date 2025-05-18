class Enemy {
    constructor(name, baseHealth) {
        this.HEALTH_BAR_COLORS = {
            background: "#333",
            fill: "#e74c3c", 
            text: "white"
        };
        this.BASE_DAMAGE = 25;
        
        if (!name || typeof baseHealth !== 'number' || baseHealth <= 0) {
            throw new Error('Invalid enemy initialization parameters');
        }
        
        this.name = name;
        this.health = baseHealth;
        this.maxHealth = baseHealth;
        this.damage = this.BASE_DAMAGE;
    }

    /**
     * Abstract method to select enemy's move
     * @param {number} timeLeft - Time remaining in current round (seconds)
     * @returns {Object|null} Move object with properties:
     *   - move: string (rock/paper/scissors)
     *   - damage: number
     *   - selectionTime: number (ms delay before choosing)
     * @throws {Error} If not implemented by subclass
     */
    selectMove(timeLeft) {
        throw new Error('selectMove must be implemented by subclass');
    }

    takeDamage(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            console.warn('Invalid damage amount:', amount);
            return this.health > 0;
        }
        this.health = Math.max(0, this.health - amount);
        return this.health > 0;
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
        ctx.fillText(`${this.name}: ${Math.round(this.health)}%`, x + 5, y + 15);
    }
}

window.Enemy = Enemy;
