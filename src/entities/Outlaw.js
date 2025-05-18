class Outlaw extends Enemy {
    constructor() {
        super('Outlaw', 25);
        this.damage = 20;
    }

    selectMove(timeLeft) {
        if (timeLeft > 2) return null;
        const moves = ['rock', 'paper', 'scissors'];
        return {
            move: moves[Math.floor(Math.random() * moves.length)],
            damage: this.damage,
            taunt: "Too slow, partner!"
        };
    }
}

window.Outlaw = Outlaw;
