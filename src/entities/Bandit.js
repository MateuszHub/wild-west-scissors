class Bandit extends Enemy {
    constructor(hp = 20, dmg = 10) {
        super('Bandit', hp);
        this.damage = dmg;
        this.actions = ['rock', 'paper', 'scissors'];
    }

    selectMove(timeLeft) {
        if(timeLeft > Math.random() * 500 + 500) return null;
        let randIdx = Math.floor(Math.random() * 3);
        return {
            action: this.actions[randIdx],
            damage: this.damage
        };
    }
}

window.Bandit = Bandit;
