class Outlaw extends Enemy {
    constructor(hp = 25, dmg = 10) {
        super('Outlaw', hp);
        this.img = new Image();
        this.img.src = 'enemy3.png';
        this.damage = dmg;
        this.actions = ['rock', 'paper', 'scissors'];
    }

    selectMove(timeLeft) {
        if(timeLeft > Math.random() * 300 + 400) return null;
        let randIdx = Math.floor(Math.random() * 3);
        return {
            action: this.actions[randIdx],
            damage: this.damage
        };
    }
}

window.Outlaw = Outlaw;
