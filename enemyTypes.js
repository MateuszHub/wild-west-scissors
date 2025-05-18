const enemyTypes = {
  bandit: {
    baseHealth: 15,
    selectMove: (timeLeft) => {
      if (timeLeft > 3) return null;
      return {
        move: 'rock',
        damage: 25,
        taunt: "I'll crush ya!"
      };
    }
  },
  outlaw: {
    baseHealth: 25,
    selectMove: (timeLeft) => {
      if (timeLeft > 2) return null;
      const moves = ['rock', 'paper', 'scissors'];
      return {
        move: moves[Math.floor(Math.random() * moves.length)],
        damage: 20,
        taunt: "Too slow, partner!"
      };
    }
  },
  gunslinger: {
    baseHealth: 30,
    selectMove: (timeLeft) => {
      if (timeLeft > 1) return null;
      return {
        move: Math.random() > 0.7 ? 'scissors' : 'paper',
        damage: 15,
        taunt: "Draw!"
      };
    }
  }
};

export default enemyTypes;
