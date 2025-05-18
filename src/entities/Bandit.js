class Bandit extends Enemy {
    constructor(hp = 20, dmg = 10) {
        super('Bandit', hp);
        this.damage = dmg;
    }

    selectMove(timeLeft) {
        if(timeLeft > Math.random() * 2000 + 500) return null;
        return {
            action: 'rock',
            damage: this.damage
        };
    }
}

window.Bandit = Bandit;
