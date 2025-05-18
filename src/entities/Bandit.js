class Bandit extends Enemy {
    constructor(hp = 20, dmg = 10) {
        super('Bandit', hp);
        this.damage = dmg;
    }

    selectMove(timeLeft) {
        return {
            action: 'rock',
            damage: this.damage
        };
    }
}

window.Bandit = Bandit;
