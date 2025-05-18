class Bandit extends Enemy {
    constructor() {
        super('Bandit', 15);
        this.damage = 25;
    }

    selectMove(timeLeft) {
        if (timeLeft > 3) return null;
        return {
            move: 'rock',
            damage: this.damage,
            taunt: "I'll crush ya!"
        };
    }
}

window.Bandit = Bandit;
