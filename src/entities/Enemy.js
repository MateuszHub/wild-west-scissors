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
        this.img = new Image();
        this.img.src = 'enemy.png';
        this.isBlinking = false;
        this.blinkFramesRemaining = 0;
        this.blinkCounter = 0;
        this.isKnockback = false;
        this.knockbackFrames = 0;
        this.originalX = 0;
        this.knockbackAmount = 0;
        this.shotSound = new Audio('revolver.mp3');
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
        if (this.isBlinking && this.blinkFramesRemaining-- % 30 < 15) {
            ctx.filter = 'brightness(200%) saturate(200%) hue-rotate(0deg)';
        }
        if(this.blinkFramesRemaining <= 0) {
          this.isBlinking = false;
        }
        ctx.scale(.6,.6);
        ctx.drawImage(this.img, ctx.canvas.width + xOffset, ctx.canvas.height - this.img.height + 200);
        ctx.restore();

        if (this.isKnockback) {
            this.knockbackFrames--;
            if (this.knockbackFrames <= 0) {
                this.isKnockback = false;
            }
        }
    }

    selectMove(timeLeft) {
        throw new Error('selectMove must be implemented by subclass');
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        this.isBlinking = true;
        this.blinkFramesRemaining = 60;
        
        this.isKnockback = true;
        this.knockbackFrames = 60;
        this.knockbackAmount = 4;
        
        // Play shot sound
        try {
            this.shotSound.currentTime = .5;
            this.shotSound.play();
        } catch (err) {
            console.warn('Could not play shot sound:', err);
        }
        
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
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.name}: ${Math.round(this.health)}HP`, x + width / 2, y + 10);
    }
}

window.Enemy = Enemy;
