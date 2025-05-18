class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scenes = {};
        this.currentScene = null;
        this.player = new Player();
        this.enemies = [new Bandit(), new Outlaw(), new Gunslinger()];
        this.currentEnemyIndex = 0;
        this.previousEnemy = null;
        this.resultText = "";
        this.gameTime = 0;
    }

    get currentEnemy() {
        return this.enemies[this.currentEnemyIndex];
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
        scene.game = this;
    }

    startGame() {
        this.player = new Player();
        this.currentEnemyIndex = 0;
        this.enemies.forEach((enemy, i) => {
            enemy.health = [15, 25, 30][i];
        });
        this.changeScene('battle');
    }

    nextEnemy() {
        this.previousEnemy = this.currentEnemy;
        this.currentEnemyIndex++;
    }

    resetGame() {
        this.player = new Player();
        this.currentEnemyIndex = 0;
        this.enemies.forEach((enemy, i) => {
            enemy.health = [15, 25, 30][i];
        });
    }

    changeScene(name) {
        console.log(`Attempting to change to scene: ${name}`);
        if (this.scenes[name]) {
            this.currentScene = this.scenes[name];
            console.log(`Entering scene: ${name}`);
            this.currentScene.enter();
            return true;
        }
        console.error(`Scene not found: ${name}`);
        return false;
    }

    update(deltaTime) {
        this.gameTime += deltaTime;
        if (this.currentScene) {
            this.currentScene.update(deltaTime);
        }
    }

    draw() {
        console.log('Drawing frame');
        if (this.currentScene) {
            this.currentScene.draw(this.ctx);
        } else {
            console.error('No current scene to draw');
        }
    }

    handleClick(x, y) {
        if (this.currentScene) {
            this.currentScene.handleClick(x, y);
        }
    }

    handleKey(key) {
        if (this.currentScene) {
            this.currentScene.handleKey(key);
        }
    }
}

window.Game = Game;
