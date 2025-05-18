class Gunslinger extends Enemy {
    constructor() {
        super('Gunslinger', 30);
        this.damage = 15;
    }

    selectMove(timeLeft) {
        if (timeLeft > 1) return null;
        return {
            move: Math.random() > 0.7 ? 'scissors' : 'paper',
            damage: this.damage,
            taunt: "Draw!"
        };
    }
}

window.Gunslinger = Gunslinger;
