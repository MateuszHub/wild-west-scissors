class Gunslinger extends Enemy {
    constructor(hp = 30, dmg = 15) {
        super('Gunslinger', hp);
        this.img = new Image();
        this.img.src = 'enemy2.png';
        this.damage = dmg;
        this.actions = ['rock', 'paper', 'scissors'];
    }

    selectMove(timeLeft) {
        if(timeLeft > Math.random() * 200 + 300) return null;
        let randIdx = Math.floor(Math.random() * 3);
        return {
            action: this.actions[randIdx],
            damage: this.damage
        };
    }
}

window.Gunslinger = Gunslinger;
