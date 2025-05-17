// Post-battle choice handling
const choice = {
    postBattleButtons: [
        { action: "next", x: 100, y: 200, width: 120, height: 50, label: "Next Battle" },
        { action: "heal", x: 240, y: 200, width: 120, height: 50, label: "Heal Up" },
        { action: "shop", x: 380, y: 200, width: 120, height: 50, label: "Go to Shop" }
    ],

    drawPostBattleScreen: function(ctx, enemy, playerHealth, nextEnemy) {
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`Pokonałeś ${enemy.name}!`, canvas.width / 2, 100);
        
        ctx.font = "20px Arial";
        ctx.fillText(`Player Health: ${playerHealth}%`, canvas.width / 2, 140);
        ctx.fillText(`Następny przeciwnik: ${nextEnemy.name}`, canvas.width / 2, 170);

        // Post-battle options
        this.postBattleButtons.forEach(btn => {
            ctx.fillStyle = "#3498db";
            ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText(btn.label, btn.x + btn.width / 2, btn.y + 32);
        });
    },

    handleChoiceClick: function(mouseX, mouseY) {
        for (let btn of this.postBattleButtons) {
            if (
                mouseX >= btn.x &&
                mouseX <= btn.x + btn.width &&
                mouseY >= btn.y &&
                mouseY <= btn.y + btn.height
            ) {
                return btn.action;
            }
        }
        return null;
    }
};
