// Menu state handling
const menu = {
    drawStartScreen: function(ctx) {
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Wild West Scissors", canvas.width / 2, 80);
        
        ctx.font = "18px Arial";
        ctx.fillText("Zasady gry:", canvas.width / 2, 120);
        ctx.fillText("1. Wybierz kamień, papier lub nożyce", canvas.width / 2, 150);
        ctx.fillText("2. Pokonaj 3 przeciwników", canvas.width / 2, 180);
        ctx.fillText("3. Każde zwycięstwo zadaje 10 obrażeń", canvas.width / 2, 210);

        // Start button
        ctx.fillStyle = "#3498db";
        ctx.fillRect(240, 250, 120, 50);
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText("Start Game", 300, 282);
    },

    drawGameOverScreen: function(ctx, resultText) {
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(resultText, canvas.width / 2, 100);
        
        ctx.font = "20px Arial";
        ctx.fillText("Kliknij aby zagrać ponownie", canvas.width / 2, 140);
    },

    handleStartClick: function(mouseX, mouseY) {
        if (mouseX >= 240 && mouseX <= 360 && mouseY >= 250 && mouseY <= 300) {
            return true;
        }
        return false;
    }
};
