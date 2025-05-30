class Button {
    constructor(x, y, width, height, label, action) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.action = action;
        this.color = "gray";
        this.textColor = "white";
    }

    draw(ctx) {
        ctx.fillStyle = this.isHovered ? this.hoverColor : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = this.textColor;
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, this.x + this.width/2, this.y + this.height/2);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && 
               mouseX <= this.x + this.width && 
               mouseY >= this.y && 
               mouseY <= this.y + this.height;
    }
}

window.Button = Button;
