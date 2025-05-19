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
        this.gold = 0;
        this.maxHealth = this.MAX_HEALTH;
        this.damage = 12;
        this.img = new Image();
        this.img.src = 'player.png';
        this.isBlinking = false;
        this.blinkFramesRemaining = 0;
        this.blinkCounter = 0;
        this.isKnockback = false;
        this.knockbackFrames = 0;
        this.originalX = 0;
        this.knockbackAmount = 0;
    }

    draw(ctx) {
        ctx.save();
        
        // Apply knockback offset
        let xOffset = 0;
        if (this.isKnockback) {
            const progress = this.knockbackFrames / 10;
            xOffset = this.knockbackAmount * Math.sin(progress * Math.PI);
        }

        // Apply damage effects
        if (this.isBlinking && this.blinkCounter % 30 < 15) {
            ctx.filter = 'brightness(200%) saturate(200%) hue-rotate(0deg)';
        }

        ctx.scale(.8,.8);
        ctx.drawImage(this.img, xOffset, 1/0.8 * ctx.canvas.height - this.img.height);
        ctx.restore();

        // Update effect states
        if (this.isBlinking) {
            this.blinkFramesRemaining--;
            this.blinkCounter++;
            if (this.blinkFramesRemaining <= 0) {
                this.isBlinking = false;
            }
        }

        if (this.isKnockback) {
            this.knockbackFrames--;
            if (this.knockbackFrames <= 0) {
                this.isKnockback = false;
            }
        }
    }

    takeDamage(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            console.warn('Invalid damage amount:', amount);
            return this.health > 0;
        }
        this.health = Math.max(0, this.health - amount);
        
        // Trigger effects
        this.isBlinking = true;
        this.blinkFramesRemaining = 60;
        this.blinkCounter = 0;
        
        this.isKnockback = true;
        this.knockbackFrames = 60;
        this.knockbackAmount = 4;
        
        return this.health > 0;
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
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
